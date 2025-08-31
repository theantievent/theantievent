const attendeesDiv = document.querySelector('.js-attenders');
const historyDiv = document.querySelector('.js-attenders-historical');
const createElement = el => document.createElement(el);

const fetchJSON = async path => {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Error cargando ${path}`);
  return response.json();
};

const renderAttendee = (attendee, isHistorical = false) => {
  const item = createElement('div');
  item.className = 'item';

  const chItem = createElement('div');
  chItem.className = 'ch-item';

  const chInfo = createElement('div');
  chInfo.className = 'ch-info';

  const chInfoFront = createElement('div');
  chInfoFront.className = 'ch-info-front';
  const image = createElement('img');
  image.src = attendee.avatar;
  if (isHistorical) image.className = 'nk-filter--grayscale';

  chInfoFront.appendChild(image);
  chInfo.appendChild(chInfoFront);

  if (!isHistorical) {
    const chInfoBack = createElement('div');
    chInfoBack.className = 'ch-info-back';

    const name = createElement('h3');
    name.innerText = attendee.name;

    const description = createElement('p');
    const link = createElement('a');
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.text = attendee.nickname;
    link.href = attendee.link;

    description.appendChild(link);
    chInfoBack.appendChild(name);
    chInfoBack.appendChild(description);

    chInfo.appendChild(chInfoBack);
  }

  chItem.appendChild(chInfo);
  item.appendChild(chItem);

  return item;
};

(async () => {
  try {
    const attendees = await fetchJSON('./js/attendees-list.json');
    attendees.forEach(attendee => {
      const el = renderAttendee(attendee);
      attendeesDiv.appendChild(el);
    });

    const historicalAttendees = await fetchJSON('./js/attendees-list-historical.json');
    historicalAttendees.forEach(attendee => {
      const el = renderAttendee(attendee, true);
      historyDiv.appendChild(el);
    });
  } catch (e) {
    console.error('Error cargando asistentes:', e);
  }
})();
