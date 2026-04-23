"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { ApartmentComparison } from '../../types/comparison';
import { formatCurrencyWithUnit } from '../../utils/formatters';
import { Search } from 'lucide-react';
import { mockApartments } from '../../services/mockData';

interface ApartmentSwitchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentApartment: ApartmentComparison;
  onSelect: (apartment: ApartmentComparison) => void;
}

/**
 * 아파트 변경 Dialog 컴포넌트
 */
export default function ApartmentSwitchDialog({
  open,
  onOpenChange,
  currentApartment,
  onSelect,
}: ApartmentSwitchDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState(currentApartment.id);

  // 검색 필터링
  const filteredApartments = mockApartments.filter(
    (apt) =>
      apt.id !== currentApartment.id &&
      (searchQuery === '' ||
        apt.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleApply = () => {
    const selected = mockApartments.find((apt) => apt.id === selectedId);
    if (selected) {
      onSelect(selected);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>비교 아파트 변경</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="아파트명 또는 단지명 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* 검색 결과 */}
          <div className="space-y-2">
            <RadioGroup value={selectedId} onValueChange={setSelectedId}>
              {filteredApartments.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-8">
                  검색 결과가 없습니다
                </p>
              ) : (
                filteredApartments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedId(apt.id)}
                  >
                    <RadioGroupItem value={apt.id} id={apt.id} />
                    <Label htmlFor={apt.id} className="flex-1 cursor-pointer">
                      <div className="space-y-1">
                        <p className="font-medium">{apt.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {apt.building_type}
                        </p>
                        <p className="text-sm font-semibold text-primary">
                          {formatCurrencyWithUnit(apt.latest_transaction_price)}
                        </p>
                      </div>
                    </Label>
                  </div>
                ))
              )}
            </RadioGroup>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1"
          >
            취소
          </Button>
          <Button onClick={handleApply} className="flex-1">
            적용
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
