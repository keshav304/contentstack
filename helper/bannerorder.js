export const bannerOrderChoice = (missions, banners) => {
  if (missions.length === 0) {
    return banners;
  }
  const mainBehaviour = missions[0].name.split(' ')[0];
  if (mainBehaviour === 'Furniture') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Bedroom') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Livingroom') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Kitchen') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
};
