const btlist = [
  {
    val: 0.1,
    name: "Luxury",
    d: 1,
  },
  {
    val: 0.14,
    name: "Decore",
  },
  {
    val: 0.23,
    name: "Furniture",
  },
  {
    val: 0.3,
    name: "Bedroom",
  },
  {
    val: 0.23,
    name: "Kitchen",
  },
  {
    name: "Dining",
    val: 0.15,
  },
  {
    name: "Homeware",
    val: 0.20,
  },
  {
    name: "Lights",
    val: 0.35,
  },
  {
    name: "Beds",
    val: 0.16,
  },
  {
    name: "Gifts",
    val: 0.14,
  },
];
export const makeDecision = (tags, bvs, banners) => {
  if (tags.length === 0 && bvs.length === 0) {
    return [null, null];
  }
  const arr = [...tags, ...bvs];
  const newarr = arr.map((a) => {
    for (const bt of btlist) {
      if (bt.name === a) {
        return {
          name: a,
          val: bt.val,
        };
      }
    }
  });
  const sorted = newarr.sort(((a, b) => b.val - a.val));
  const mainBehaviour = sorted[0].name;
  if (banners && mainBehaviour) {
    if (mainBehaviour === 'Homeware') {
      const list = banners.map((b) => {
        if (b.link.title.toLowerCase() === 'livingroomnormal') {
          b.index = 0;
        }
        if (b.link.title.toLowerCase() === 'livingroomluxury') {
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
      return [sortedList, mainBehaviour];
    }
    if (mainBehaviour === 'Decore' || mainBehaviour === 'Gifts') {
      const list = banners.map((b) => {
        if (b.link.title.toLowerCase() === 'decore') {
          b.index = 0;
        }
        if (b.link.title.toLowerCase() === 'livingroomnormal') {
          b.index = 1;
        }
        if (b.link.title.toLowerCase() === 'livingroomluxury') {
          b.index = 2;
        }
        if (b.link.title.toLowerCase() === 'kitchen') {
          b.index = 3;
        }
        if (b.link.title.toLowerCase() === 'bed') {
          b.index = 4;
        }
        return b;
      });
      const sortedList = list.sort(((a, b) => a.index - b.index));
      return [sortedList, mainBehaviour];
    }
    if (mainBehaviour === 'Kitchen' || mainBehaviour === 'Dining') {
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
      return [sortedList, mainBehaviour];
    }
    if (mainBehaviour === 'Bedroom' || mainBehaviour === 'Beds' || mainBehaviour === 'Furniture') {
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
      return [sortedList, mainBehaviour];
    }
    if (mainBehaviour === 'Luxury' || mainBehaviour === 'Lights') {
      const list = banners.map((b) => {
        if (b.link.title.toLowerCase() === 'livingroomluxury') {
          b.index = 0;
        }
        if (b.link.title.toLowerCase() === 'kitchen') {
          b.index = 1;
        }

        if (b.link.title.toLowerCase() === 'livingroomnormal') {
          b.index = 4;
        }
        if (b.link.title.toLowerCase() === 'bed') {
          b.index = 3;
        }

        if (b.link.title.toLowerCase() === 'decore') {
          b.index = 2;
        }
        return b;
      });
      const sortedList = list.sort(((a, b) => a.index - b.index));
      return [sortedList, mainBehaviour];
    }
    return [banners, mainBehaviour];
  }
  return [mainBehaviour, sorted];
};
