import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './SimpleMasonry.css';

const SimpleMasonry = ({ items }) => {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!items?.length) return;

    const container = containerRef.current;
    if (!container) return;

    // Простий masonry layout
    const columns = window.innerWidth >= 1200 ? 4 : window.innerWidth >= 768 ? 3 : 2;
    const columnHeights = new Array(columns).fill(0);
    const columnWidth = 100 / columns;

    container.style.position = 'relative';
    container.style.width = '100%';

    items.forEach((item, index) => {
      const element = container.children[index];
      if (!element) return;

      // Знаходимо найкоротшу колонку
      const shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
      const left = shortestColumn * columnWidth;
      const top = columnHeights[shortestColumn];

      // Встановлюємо позицію
      gsap.set(element, {
        position: 'absolute',
        left: `${left}%`,
        top: `${top}px`,
        width: `${columnWidth - 2}%`,
        opacity: 0
      });

      // Оновлюємо висоту колонки
      const height = element.offsetHeight + 16; // +16px для gap
      columnHeights[shortestColumn] += height;

      // Анімація появи
      gsap.to(element, {
        opacity: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    });

    // Встановлюємо висоту контейнера
    const maxHeight = Math.max(...columnHeights);
    container.style.height = `${maxHeight}px`;

    setLoaded(true);
  }, [items]);

  if (!items?.length) {
    return <div className="text-white/60 text-center py-12">Немає товарів</div>;
  }

  return (
    <div ref={containerRef} className="simple-masonry">
      {items.map((item) => (
        <div
          key={item.id}
          className="masonry-item"
          onClick={() => {
            if (item.url.startsWith('/')) {
              window.location.href = item.url;
            } else {
              window.open(item.url, '_blank', 'noopener');
            }
          }}
        >
          <div className="item-image">
            <img
              src={item.img}
              alt={item.product?.title || 'Product'}
              loading="lazy"
            />
            <div className="item-overlay">
              <h3 className="item-title">{item.product?.title}</h3>
              <p className="item-price">{item.product?.price} грн</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SimpleMasonry;