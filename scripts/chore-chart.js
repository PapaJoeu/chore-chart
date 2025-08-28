/* ---------- Utility date helpers ---------- */
const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function startOfPreviousSunday(fromDate = new Date()) {
  const d = new Date(fromDate);
  const delta = d.getDay();
  d.setDate(d.getDate() - delta);
  if (fromDate.getDay() === 0) d.setDate(d.getDate() - 7);
  d.setHours(0,0,0,0);
  return d;
}

function startOfNextSunday(fromDate = new Date()) {
  const d = new Date(fromDate);
  const delta = (7 - d.getDay()) % 7;
  d.setDate(d.getDate() + (delta === 0 ? 7 : delta));
  d.setHours(0,0,0,0);
  return d;
}

function addDays(date, n) { const d = new Date(date); d.setDate(d.getDate()+n); return d; }
function fmtDate(date) {
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

// Compute first weekday-of-month date for given weekday name
function firstWeekdayOfMonth(year, monthIndex0, weekdayName) {
  const targetDow = DAY_NAMES.indexOf(weekdayName);
  if (targetDow < 0) return null;
  const d = new Date(year, monthIndex0, 1);
  const delta = (targetDow - d.getDay() + 7) % 7;
  d.setDate(1 + delta);
  d.setHours(0,0,0,0);
  return d;
}

// ---------- Data load ----------
function loadConfig() {
  return window.CHORE_CONFIG || {};
}

// Decide if chore applies to a given date based on rate and optional days
function appliesOn(chore, date, weekStart, defaults) {
  const dowName = DAY_NAMES[date.getDay()];
  const rate = (chore.rate || '').toUpperCase();

  if (rate === 'D') return true;

  if (rate === 'S') {
    const day = (chore.days && chore.days[0]) || defaults.weeklyDay || 'Sunday';
    return dowName === day;
  }

  if (rate === 'SWF') {
    const days = (chore.days && chore.days.length ? chore.days : defaults.swfDays) || ['Sunday','Wednesday','Friday'];
    return days.includes(dowName);
  }

  if (rate === 'M' || rate === 'MONTHLY') {
    const monthAnchorDay = (chore.days && chore.days[0]) || defaults.monthlyDay || 'Sunday';
    const anchor = firstWeekdayOfMonth(weekStart.getFullYear(), weekStart.getMonth(), monthAnchorDay);
    const weekEnd = addDays(weekStart, 6);
    return +date === +anchor && anchor >= weekStart && anchor <= weekEnd;
  }

  return false; // unknown rate => treat as N/A
}

function groupByCategory(chores) {
  const map = new Map();
  for (const c of chores) {
    if (!map.has(c.category)) map.set(c.category, []);
    map.get(c.category).push(c);
  }
  return [...map.entries()].map(([category, items]) => ({ category, items }));
}

function buildWeek(start) {
  const dates = Array.from({length:7}, (_,i)=> addDays(start, i));
  const cfg = loadConfig();
  const grouped = groupByCategory(cfg.chores);

  // header range label
  const range = `${fmtDate(dates[0])} – ${fmtDate(dates[6])}`;
  document.getElementById('daterange').textContent = `Week of ${fmtDate(dates[0])} (${range})`;

  const tbl = document.getElementById('grid');
  tbl.innerHTML = '';

  // Build header row
  const thead = document.createElement('thead');
  const hr = document.createElement('tr');

  const thTask = document.createElement('th'); thTask.className = 'col-task'; thTask.textContent = 'Chore'; hr.appendChild(thTask);

  for (const d of dates) {
    const th = document.createElement('th'); th.className = 'col-day';
    const dow = document.createElement('span'); dow.className = 'dow'; dow.textContent = DAY_NAMES[d.getDay()].slice(0,3).toUpperCase();
    const dd = document.createElement('span'); dd.className = 'date'; dd.textContent = fmtDate(d);
    th.appendChild(dow); th.appendChild(dd); hr.appendChild(th);
  }
  thead.appendChild(hr);

  const tbody = document.createElement('tbody');

  grouped.forEach((grp, idx) => {
    if (idx > 0) {
      const spacer = document.createElement('tr');
      const spTd = document.createElement('td');
      spTd.className = 'spacer';
      spTd.colSpan = dates.length + 1;
      spacer.appendChild(spTd);
      tbody.appendChild(spacer);
    }

    const headingTr = document.createElement('tr');
    const headingTd = document.createElement('td');
    headingTd.className = 'category-heading';
    headingTd.textContent = grp.category;
    headingTd.colSpan = dates.length + 1;
    headingTr.appendChild(headingTd);
    tbody.appendChild(headingTr);

    grp.items.forEach(chore => {
      const tr = document.createElement('tr');

      const tdTask = document.createElement('td'); tdTask.className = 'task'; tdTask.textContent = chore.name; tr.appendChild(tdTask);

      dates.forEach(d => {
        const td = document.createElement('td'); td.className = 'cell';
        const ok = appliesOn(chore, d, dates[0], cfg.defaults || {});
        const box = document.createElement('span');
        box.className = ok ? 'box' : 'na-square';
        td.appendChild(box);
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });
  });

  thead.appendChild(hr);
  tbl.appendChild(thead);
  tbl.appendChild(tbody);

}

// ---------- Init & controls ----------
function init() {
  const prevBtn = document.getElementById('prevSundayBtn');
  const nextBtn = document.getElementById('nextSundayBtn');
  const printBtn = document.getElementById('printBtn');

  prevBtn.addEventListener('click', () => buildWeek(startOfPreviousSunday(new Date())));
  nextBtn.addEventListener('click', () => buildWeek(startOfNextSunday(new Date())));
  printBtn.addEventListener('click', () => {
    window.print();
  });

  // Prompt-like default build: show both options; do nothing until user clicks.
  // For convenience, if you want an automatic default, uncomment one of these:
  // buildWeek(startOfNextSunday(new Date()));
  // buildWeek(startOfPreviousSunday(new Date()));
}

document.addEventListener('DOMContentLoaded', init);
