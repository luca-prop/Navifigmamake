import { FOOTER_DISCLAIMER } from '../../utils/constants';

/**
 * 고정 하단 Footer 컴포넌트
 * 법적 안내 문구 표시
 */
export default function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30 py-4 px-6 mt-auto">
      <div className="max-w-7xl mx-auto">
        <p className="text-sm text-muted-foreground text-center">
          {FOOTER_DISCLAIMER}
        </p>
      </div>
    </footer>
  );
}
