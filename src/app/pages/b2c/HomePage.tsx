import SearchHero from '../../components/b2c/SearchHero';

interface HomePageProps {
  onNavigate: (route: string, params?: Record<string, any>) => void;
}

/**
 * B2C 메인 랜딩 페이지
 */
export default function HomePage({ onNavigate }: HomePageProps) {
  const handleSearch = (budget: number) => {
    onNavigate('search-results', { budget });
  };

  return (
    <div className="min-h-[80vh]">
      <SearchHero onSearch={handleSearch} />
    </div>
  );
}
