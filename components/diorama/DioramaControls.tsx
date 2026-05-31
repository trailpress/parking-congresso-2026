'use client';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';

export type DioramaMode = 'external' | 'exploded' | 'focus';

type DioramaControlsProps = {
  labelsVisible: boolean;
  mode: DioramaMode;
  onModeChange: (mode: DioramaMode) => void;
  onToggleLabels: () => void;
};

export function DioramaControls({
  labelsVisible,
  mode,
  onModeChange,
  onToggleLabels
}: DioramaControlsProps) {
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={() => onModeChange(mode === 'exploded' ? 'external' : 'exploded')}
          variant={mode === 'exploded' ? 'primary' : 'secondary'}
        >
          <Icon className="h-4 w-4" name="layers" />
          Esploso
        </Button>
        <Button
          onClick={() => onModeChange(mode === 'external' ? 'exploded' : 'external')}
          variant={mode !== 'external' ? 'primary' : 'secondary'}
        >
          <Icon className="h-4 w-4" name="grid" />
          Livelli
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={onToggleLabels} variant={labelsVisible ? 'primary' : 'secondary'}>
          <Icon className="h-4 w-4" name="source" />
          Etichette
        </Button>
        <Button
          onClick={() => onModeChange(mode === 'focus' ? 'exploded' : 'focus')}
          variant={mode === 'focus' ? 'primary' : 'secondary'}
        >
          <Icon className="h-4 w-4" name="map" />
          Focus settore
        </Button>
      </div>
    </div>
  );
}
