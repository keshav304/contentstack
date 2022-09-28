export const bannerOrderChoice = (missions, banners) => {
  if (missions.length === 0) {
    return banners;
  }
  const sortedmissions = missions.sort(((a, b) => b.val - a.val));
  const mainBehaviour = sortedmissions[0].name.split(' ')[0];
  const secondBvr = sortedmissions[1].name.split(' ')[0];
  const thirdBvr = sortedmissions[2].name.split(' ')[0];
  const fourthBvr = sortedmissions[3].name.split(' ')[0];
  if (mainBehaviour === 'Furniture' && secondBvr === 'Bedroom' && thirdBvr === 'Livingroom' && fourthBvr === 'Kitchen') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 4;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 3;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Furniture' && secondBvr === 'Bedroom' && thirdBvr === 'Kitchen' && fourthBvr === 'Livingroom') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 1;
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
  if (mainBehaviour === 'Furniture' && secondBvr === 'Kitchen' && thirdBvr === 'Bedroom' && fourthBvr === 'Livingroom') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 4;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 3;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Furniture' && secondBvr === 'Kitchen' && thirdBvr === 'Livingroom' && fourthBvr === 'Bedroom') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 4;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 3;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Furniture' && secondBvr === 'Livingroom' && thirdBvr === 'Kitchen' && fourthBvr === 'Bedroom') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Furniture' && secondBvr === 'Livingroom' && thirdBvr === 'Bedroom' && fourthBvr === 'Kitchen') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 0;
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

  if (mainBehaviour === 'Bedroom' && secondBvr === 'Furniture' && thirdBvr === 'Livingroom' && fourthBvr === 'Kitchen') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 0;
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
  if (mainBehaviour === 'Bedroom' && secondBvr === 'Furniture' && thirdBvr === 'Kitchen' && fourthBvr === 'Livingroom') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 0;
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
  if (mainBehaviour === 'Bedroom' && secondBvr === 'Kitchen' && thirdBvr === 'Furniture' && fourthBvr === 'Livingroom') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Bedroom' && secondBvr === 'Kitchen' && thirdBvr === 'Livingroom' && fourthBvr === 'Furniture') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Bedroom' && secondBvr === 'Livingroom' && thirdBvr === 'Kitchen' && fourthBvr === 'Furniture') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 0;
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
  if (mainBehaviour === 'Bedroom' && secondBvr === 'Livingroom' && thirdBvr === 'Furniture' && fourthBvr === 'Kitchen') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 0;
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

  if (mainBehaviour === 'Livingroom' && secondBvr === 'Furniture' && thirdBvr === 'Bedroom' && fourthBvr === 'Kitchen') {
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
  if (mainBehaviour === 'Livingroom' && secondBvr === 'Furniture' && thirdBvr === 'Kitchen' && fourthBvr === 'Bedroom') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Livingroom' && secondBvr === 'Kitchen' && thirdBvr === 'Furniture' && fourthBvr === 'Bedroom') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Livingroom' && secondBvr === 'Kitchen' && thirdBvr === 'Bedroom' && fourthBvr === 'Furniture') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Livingroom' && secondBvr === 'Bedroom' && thirdBvr === 'Kitchen' && fourthBvr === 'Furniture') {
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
  if (mainBehaviour === 'Livingroom' && secondBvr === 'Bedroom' && thirdBvr === 'Furniture' && fourthBvr === 'Kitchen') {
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

  if (mainBehaviour === 'Kitchen' && secondBvr === 'Furniture' && thirdBvr === 'Livingroom' && fourthBvr === 'Bedroom') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Kitchen' && secondBvr === 'Furniture' && thirdBvr === 'Bedroom' && fourthBvr === 'Livingroom') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Kitchen' && secondBvr === 'Bedroom' && thirdBvr === 'Furniture' && fourthBvr === 'Livingroom') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Kitchen' && secondBvr === 'Bedroom' && thirdBvr === 'Livingroom' && fourthBvr === 'Furniture') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Kitchen' && secondBvr === 'Livingroom' && thirdBvr === 'Furniture' && fourthBvr === 'Bedroom') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }
  if (mainBehaviour === 'Kitchen' && secondBvr === 'Livingroom' && thirdBvr === 'Bedroom' && fourthBvr === 'Furniture') {
    const list = banners.map((b) => {
      if (b.link.title.toLowerCase() === 'livingroomluxury') {
        b.index = 1;
      }
      if (b.link.title.toLowerCase() === 'livingroomnormal') {
        b.index = 3;
      }
      if (b.link.title.toLowerCase() === 'bed') {
        b.index = 2;
      }
      if (b.link.title.toLowerCase() === 'kitchen') {
        b.index = 0;
      }
      if (b.link.title.toLowerCase() === 'decore') {
        b.index = 4;
      }
      return b;
    });
    const sortedList = list.sort(((a, b) => a.index - b.index));
    return sortedList;
  }

  // if (mainBehaviour === 'Furniture') {
  //   const list = banners.map((b) => {
  //     if (b.link.title.toLowerCase() === 'livingroomluxury') {
  //       b.index = 0;
  //     }
  //     if (b.link.title.toLowerCase() === 'livingroomnormal') {
  //       b.index = 1;
  //     }
  //     if (b.link.title.toLowerCase() === 'bed') {
  //       b.index = 2;
  //     }
  //     if (b.link.title.toLowerCase() === 'kitchen') {
  //       b.index = 3;
  //     }
  //     if (b.link.title.toLowerCase() === 'decore') {
  //       b.index = 4;
  //     }
  //     return b;
  //   });
  //   const sortedList = list.sort(((a, b) => a.index - b.index));
  //   return sortedList;
  // }
  // if (mainBehaviour === 'Bedroom') {
  //   const list = banners.map((b) => {
  //     if (b.link.title.toLowerCase() === 'bed') {
  //       b.index = 0;
  //     }
  //     if (b.link.title.toLowerCase() === 'livingroomluxury') {
  //       b.index = 1;
  //     }
  //     if (b.link.title.toLowerCase() === 'livingroomnormal') {
  //       b.index = 2;
  //     }
  //     if (b.link.title.toLowerCase() === 'kitchen') {
  //       b.index = 3;
  //     }
  //     if (b.link.title.toLowerCase() === 'decore') {
  //       b.index = 4;
  //     }
  //     return b;
  //   });
  //   const sortedList = list.sort(((a, b) => a.index - b.index));
  //   return sortedList;
  // }
  // if (mainBehaviour === 'Livingroom') {
  //   const list = banners.map((b) => {
  //     if (b.link.title.toLowerCase() === 'livingroomnormal') {
  //       b.index = 0;
  //     }
  //     if (b.link.title.toLowerCase() === 'livingroomluxury') {
  //       b.index = 1;
  //     }
  //     if (b.link.title.toLowerCase() === 'kitchen') {
  //       b.index = 2;
  //     }
  //     if (b.link.title.toLowerCase() === 'bed') {
  //       b.index = 3;
  //     }
  //     if (b.link.title.toLowerCase() === 'decore') {
  //       b.index = 4;
  //     }
  //     return b;
  //   });
  //   const sortedList = list.sort(((a, b) => a.index - b.index));
  //   return sortedList;
  // }
  // if (mainBehaviour === 'Kitchen') {
  //   const list = banners.map((b) => {
  //     if (b.link.title.toLowerCase() === 'kitchen') {
  //       b.index = 0;
  //     }
  //     if (b.link.title.toLowerCase() === 'livingroomluxury') {
  //       b.index = 1;
  //     }
  //     if (b.link.title.toLowerCase() === 'decore') {
  //       b.index = 2;
  //     }
  //     if (b.link.title.toLowerCase() === 'livingroomnormal') {
  //       b.index = 3;
  //     }
  //     if (b.link.title.toLowerCase() === 'bed') {
  //       b.index = 4;
  //     }
  //     return b;
  //   });
  //   const sortedList = list.sort(((a, b) => a.index - b.index));
  //   return sortedList;
  // }
};
