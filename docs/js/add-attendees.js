const historyDiv = document.querySelector('.js-attenders-historical');
const createElement = element => document.createElement(element);

const getAttendeesList = async () => {
  const response = await fetch('./js/attendees-list.json');
  return response.json();
};

const getHistoricalAttendees = async () => {
  const response = await fetch('./js/attendees-list-historical.json');
  return response.json();
};

const renderAttendee = attendee => {
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

  chInfoFront.appendChild(image);
  chInfo.appendChild(chInfoFront);
  chItem.appendChild(chInfo);
  item.appendChild(chItem);

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

  return item;
};

const renderHistoricalAttendee = attendee => {
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

  chInfoFront.appendChild(image);
  chInfo.appendChild(chInfoFront);
  chItem.appendChild(chInfo);
  item.appendChild(chItem);

  return item;
};

(async () => {
  // const antiAttendees = await getAttendeesList();
  // antiAttendees.forEach(attendee => {
  //   const el = renderAttendee(attendee);
  //   attendeesDiv.insertBefore(el, attendeesDiv.firstChild);
  // });

  const historicalAttendees = await getHistoricalAttendees();
  historicalAttendees.forEach(attendee => {
    const el = renderHistoricalAttendee(attendee);
    historyDiv.insertBefore(el, historyDiv.firstChild);
  });
})();
