"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { validateEmail } from '../../utils/validators';
import { Listing } from '../../types/listing';
import { formatCurrencyWithUnit } from '../../utils/formatters';
import { Mail } from 'lucide-react';

interface ContactRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: Listing;
  onSubmit: (email: string) => void;
}

/**
 * 연락처 요청 Dialog 컴포넌트
 */
export default function ContactRequestDialog({
  open,
  onOpenChange,
  listing,
  onSubmit,
}: ContactRequestDialogProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = () => {
    const validation = validateEmail(email);
    if (!validation.valid) {
      setEmailError(validation.error || '');
      return;
    }

    onSubmit(email);
    setEmail('');
    setEmailError('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            매물 상세 정보 요청
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            이 매물의 상세 정보(연락처 등)는 이메일로 전송됩니다.
          </p>

          {/* 매물 요약 */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="font-semibold">{listing.district_name}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">매물 유형</p>
                <p className="font-medium">{listing.type}</p>
              </div>
              <div>
                <p className="text-muted-foreground">호가</p>
                <p className="font-medium">
                  {formatCurrencyWithUnit(listing.asking_price)}
                </p>
              </div>
            </div>
          </div>

          {/* 이메일 입력 */}
          <div className="space-y-2">
            <Label>이메일 주소</Label>
            <Input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
            />
            {emailError && (
              <p className="text-sm text-destructive">{emailError}</p>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            * 개인정보는 매물 정보 제공 목적으로만 사용됩니다.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            취소
          </Button>
          <Button onClick={handleSubmit} className="flex-1">
            정보 요청하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
