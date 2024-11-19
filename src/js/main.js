
const newsItems = [
  {
    image: "/img/img2.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  },
  {
    image: "/img/img3.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  },
  {
    image: "/img/img1.png",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  },
  {
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  },
  {
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  },
  {
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat."
  }
];

const newsContainer = document.getElementById('news-container');
const dotsContainer = document.querySelector('.news-progress-dots');

let currentGroupIndex = 0;

function renderNewsItems() {
  const newsCards = [];
  for (let i = 0; i < newsItems.length; i++) {
    const newsCard = document.createElement('div');
    newsCard.classList.add('news-card');
    newsCard.innerHTML = `
      <img src="${newsItems[i].image}" alt="News ${i + 1}" class="news-img">
  <div class="news-content">
    <p class="news-card-text">${newsItems[i].text} 
    <span class="read-more">Read <span class="arrow">&raquo;</span></span></p>
  </div>
    `;
    newsCards.push(newsCard);
  }

  const groups = [];
  for (let i = 0; i < newsCards.length; i += (window.innerWidth <= 767 ? 1 : 3)) {
    const group = newsCards.slice(i, i + (window.innerWidth <= 767 ? 1 : 3));
    groups.push(group);
  }

  newsContainer.innerHTML = '';
  groups.forEach((group, index) => {
    const groupContainer = document.createElement('div');
    groupContainer.classList.add('news-group');
    group.forEach((card) => {
      groupContainer.appendChild(card);
    });
    newsContainer.appendChild(groupContainer);
  });

  updateVisibleGroup();
}

function updateVisibleGroup() {
  const groups = document.querySelectorAll('.news-group');
  groups.forEach((group, index) => {
    group.style.display = index === currentGroupIndex ? 'flex' : 'none';
  });
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentGroupIndex);
  });
}

function setCurrentGroupIndex(index) {
  currentGroupIndex = index;
  updateVisibleGroup();
  updateDots();
}

renderNewsItems();

currentGroupIndex = (currentGroupIndex + 1) % Math.ceil(newsItems.length / 3);
  updateVisibleGroup();
  updateDots();

dotsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('dot')) {
    const index = Array.prototype.indexOf.call(event.target.parentNode.children, event.target);
    setCurrentGroupIndex(index);
  }
});

