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

// GridItem 컴포넌트의 props 타입을 정의합니다.
interface GridItemProps extends GridItemData {
  index: number;
}

// 그리드 아이템 데이터 배열입니다.
const gridItems: GridItemData[] = [
  {
    type: 'Members',
    title: 'Professor Woojin Lee',
    imageUrl: '/img/Professor.jpg',
    link: '/STLAB/About-Us#지도교수-이우진',
    size: 'medium',
  },
  {
    type: 'spacer',
    size: 'small',
  },
  {
    type: 'Lab Activity',
    title: '2024 Winter Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1280&auto=format&fit=crop',
    link: '/STLAB/Gallery',
    size: 'large',
  },
  {
    type: 'Members',
    title: 'Jungin Kim',
    imageUrl: 'https://til.jungin.kim/img/background.jpg',
    link: 'https://github.com/orgs/knu-eselab/people',
    size: 'small',
  },
  {
    type: 'External Link',
    title: 'KNU School of Computer Science & Engineering',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1300&auto=format&fit=crop',
    link: 'https://cse.knu.ac.kr',
    size: 'medium_wide',
  },
  {
    type: 'Personal Blog',
    title: 'Today I Learned',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1280&auto=format&fit=crop',
    link: 'https://til.jungin.kim',
    size: 'small',
  },
  {
    type: 'Lab Introduction',
    title: 'Growing Together at STLAB',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1280&auto=format&fit=crop',
    link: '/STLAB/About-Us',
    size: 'medium',
  },
  {
    type: 'Research Area',
    title: 'AI-Based Software Testing Automation',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQoqKi_gQOpt8QNiyuiTUYKW7VEPipYGfvUA&s',
    link: '/STLAB/Research_Area/AI-Based-Software-Testing',
    size: 'large',
  },
  {
    type: 'spacer',
    size: 'small',
  },
  {
    type: 'Research Project',
    title: 'Autonomous Cooperative Platform for Intelligent Mobility',
    imageUrl: 'https://transport.ec.europa.eu/sites/default/files/styles/oe_theme_medium_no_crop/public/2016-11/c-its-wheel.png?itok=vFfxohoe',
    link: '/STLAB/Project',
    size: 'small',
  },
  {
    type: 'Latest Paper',
    title: 'Predicting Learner Level Based on Accumulated Learning Data',
    imageUrl: 'https://placehold.co/400x400/111827/d1d5db?text=Paper',
    link: '/Conference/Domestic/프로그래밍-교육-피드백을-위한-누적-학습-데이터-기반-학습자-수준-예측',
    size: 'small',
  },
  {
    type: 'Notice',
    title: 'Now Recruiting Graduate Students for Fall 2025',
    imageUrl: 'https://placehold.co/800x400/A41E22/FFFFFF?text=Notice',
    link: '/STLAB/Admissions',
    size: 'medium_wide',
  },
  {
    type: 'International Journal',
    title: 'An empirical study of configuration changes in Android apps',
    imageUrl: 'https://ars.els-cdn.com/content/image/1-s2.0-S0164121219301396-gr9.jpg',
    link: '/Journal/International/An-empirical-study-of-configuration-changes-and-adoption-in-Android-apps',
    size: 'medium',
  },
  {
    type: 'Research Area',
    title: 'Formal Verification & Model Checking',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1280&auto=format&fit=crop',
    link: '/STLAB/Research_Area/Formal-Verification',
    size: 'small',
  },
  {
    type: 'Patent',
    title: 'System and Method for Automated Scoring of Embedded Software',
    imageUrl: 'https://placehold.co/400x400/9ca3af/111827?text=Patent',
    link: '/Patent/시뮬레이터를-이용한-임베디드-소프트웨어-자동-채점-시스템-및-방법',
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
