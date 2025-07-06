import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './index.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Grid 아이템 데이터의 타입을 정의합니다.
interface GridItemData {
  type: string;
  title?: string; // spacer 타입의 경우 title이 없을 수 있습니다.
  imageUrl?: string;
  link?: string;
  size: 'small' | 'medium' | 'large' | 'medium_wide';
}

// 그리드 아이템 데이터 배열입니다. (안경 테마로 변경)
const gridItems: GridItemData[] = [
  {
    type: 'Our Brand',
    title: 'The Vision of Spectacle Report',
    imageUrl: 'https://images.pexels.com/photos/29538707/pexels-photo-29538707.jpeg',
    link: '/about',
    size: 'medium',
  },
  {
    type: 'spacer',
    size: 'small',
  },
  {
    type: 'Collection',
    title: 'The Aviator: A Timeless Classic',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1280&auto=format&fit=crop',
    link: '/collection/aviator',
    size: 'small',
  },
  {
    type: 'New Arrival',
    title: 'Modern Hexagonal Frames',
    imageUrl: 'https://images.pexels.com/photos/32877668/pexels-photo-32877668.jpeg',
    link: '/new-arrivals',
    size: 'large',
  },
  {
    type: 'Behind the Scenes',
    title: 'Crafting Perfection: Our Workshop',
    imageUrl: 'https://images.pexels.com/photos/32744512/pexels-photo-32744512.jpeg',
    link: '/about/craftsmanship',
    size: 'medium_wide',
  },
  {
    type: 'Style Guide',
    title: 'Find Your Perfect Pair',
    imageUrl: 'https://images.pexels.com/photos/5151132/pexels-photo-5151132.jpeg',
    link: '/style-guide',
    size: 'small',
  },
  {
    type: 'Technology',
    title: 'Advanced Lens Technology',
    imageUrl: 'https://images.pexels.com/photos/32715723/pexels-photo-32715723.jpeg',
    link: '/technology',
    size: 'medium',
  },
  {
    type: 'Collection',
    title: 'The Minimalist: Clean & Simple',
    imageUrl: 'https://images.pexels.com/photos/32677205/pexels-photo-32677205.jpeg',
    link: '/collection/minimalist',
    size: 'large',
  },
  {
    type: 'spacer',
    size: 'small',
  },
  {
    type: 'Featured',
    title: 'The Round Frame',
    imageUrl: 'https://images.pexels.com/photos/29538716/pexels-photo-29538716.jpeg',
    link: '/featured/round-frame',
    size: 'small',
  },
  {
    type: 'Materials',
    title: 'Sustainable & Durable Materials',
    imageUrl: 'https://images.pexels.com/photos/32678821/pexels-photo-32678821.jpeg',
    link: '/about/materials',
    size: 'small',
  },
  {
    type: 'Special Offer',
    title: 'Summer Sale: Up to 30% Off',
    imageUrl: 'https://images.pexels.com/photos/32677238/pexels-photo-32677238.jpeg',
    link: '/sale',
    size: 'medium_wide',
  },
  {
    type: 'Customer Story',
    title: 'A New Perspective',
    imageUrl: 'https://images.pexels.com/photos/7062780/pexels-photo-7062780.jpeg',
    link: '/stories/a-new-perspective',
    size: 'medium',
  },
  {
    type: 'Design',
    title: 'The Art of the Frame',
    imageUrl: 'https://images.pexels.com/photos/7357978/pexels-photo-7357978.jpeg',
    link: '/about/design',
    size: 'small',
  },
  {
    type: 'News',
    title: 'Our Latest Press Feature',
    imageUrl: 'https://images.pexels.com/photos/8104329/pexels-photo-8104329.jpeg',
    link: '/press',
    size: 'small',
  },
];

// 스크롤 애니메이션을 위한 커스텀 훅
function useScrollAnimation(): void {
  useEffect(() => {
    // IntersectionObserver가 지원되지 않으면 실행하지 않습니다.
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const animatedItems = document.querySelectorAll<HTMLElement>(`.${styles.animateOnScroll}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isVisible);
            observer.unobserve(entry.target); // 애니메이션이 한 번 실행된 후에는 관찰을 중단합니다.
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.1, // 요소의 10%가 보일 때 애니메이션을 트리거합니다.
      }
    );

    animatedItems.forEach((item) => {
      observer.observe(item);
    });

    // 컴포넌트가 언마운트될 때 observer를 정리합니다.
    return () => {
      animatedItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);
}

// 그리드 아이템을 렌더링하는 컴포넌트
const GridItem: React.FC<GridItemProps> = ({ type, title, imageUrl, link, size, index }) => {
  // spacer 타입의 아이템은 레이아웃을 위한 빈 div를 렌더링합니다.
  if (type === 'spacer') {
    return <div className={clsx(styles.gridItem_spacer, size && styles[`gridItem_${size}`])} />;
  }
  
  const itemClasses = clsx(styles.gridItem, size && styles[`gridItem_${size}`], styles.animateOnScroll);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; // 무한 루프 방지
    e.currentTarget.src = 'https://placehold.co/600x400/eee/ccc?text=Image+Error';
  };

  return (
    <div className={itemClasses} style={{ transitionDelay: `${index * 50}ms` }}>
      <img src={imageUrl} alt={title} className={styles.cardImage} onError={handleImageError} />
      <div className={styles.cardOverlay}></div>
      <div className={styles.cardContent}>
        <span className={styles.cardType}>{type}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
      </div>
      <Link to={link || '#'} className={styles.cardLink} aria-label={title}></Link>
    </div>
  );
}

// 메인 홈페이지 컴포넌트
const Home: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  useScrollAnimation(); // 스크롤 애니메이션 훅을 활성화합니다.

  return (
    <Layout
      title="Home"
      description={`${siteConfig.tagline}`}>
      <main className={styles.homepageContainer}>
        <header className={styles.pageHeader}>
          <h1 className={clsx(styles.pageTitle, styles.animateOnScroll)}>{siteConfig.title}</h1>
          <p className={clsx(styles.pageSubtitle, styles.animateOnScroll)} style={{transitionDelay: '100ms'}}>
            {siteConfig.tagline}
          </p>
        </header>

        <div className={styles.mainGrid}>
          {gridItems.map((item, index) => (
            <GridItem key={index} index={index} {...item} />
          ))}
        </div>
      </main>
    </Layout>
  );
}

export default Home;
