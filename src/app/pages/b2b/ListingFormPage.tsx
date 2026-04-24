"use client";

import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import ListingForm from '../../components/b2b/ListingForm';
import AccessDeniedAlert from '../../components/b2b/AccessDeniedAlert';
import { Lock } from 'lucide-react';

const VALID_PASSCODE = '1234'; // Mock 패스코드

/**
 * B2B 매물 등록 페이지
 */
export default function ListingFormPage() {
  const [passcode, setPasscode] = useState('');
  const [hasAccess, setHasAccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyPasscode = () => {
    setIsVerifying(true);
    setTimeout(() => {
      if (passcode === VALID_PASSCODE) {
        setHasAccess(true);
      } else {
        setHasAccess(false);
      }
      setIsVerifying(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">매물 등록</h1>
          <p className="text-muted-foreground">
            재개발 구역 매물을 등록하여 고객에게 제공하세요
          </p>
        </div>

        {/* 패스코드 입력 */}
        {!hasAccess && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">접근 코드 입력</h2>
              </div>

              <div className="space-y-2">
                <Label>접근 코드</Label>
                <Input
                  type="password"
                  placeholder="패스코드를 입력하세요"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleVerifyPasscode();
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  * 데모용 패스코드: 1234
                </p>
              </div>

              <Button
                onClick={handleVerifyPasscode}
                className="w-full"
                disabled={isVerifying || !passcode}
              >
                {isVerifying ? '확인 중...' : '확인'}
              </Button>
            </div>
          </Card>
        )}

        {/* 접근 차단 메시지 */}
        {passcode && !hasAccess && !isVerifying && <AccessDeniedAlert />}

        {/* 매물 등록 폼 */}
        <Card className={`p-6 ${!hasAccess ? 'opacity-60 pointer-events-none' : ''}`}>
          <h2 className="text-xl font-semibold mb-6">매물 정보</h2>
          <ListingForm hasAccess={hasAccess} />
        </Card>
      </div>
    </div>
  );
}
