import { Badge } from '@/components/ui/Badge';
import type { SourceReference } from '@/lib/types';

type SourceBadgeProps = {
  source: SourceReference;
};

export function SourceBadge({ source }: SourceBadgeProps) {
  const page = source.page ? `, pag. ${source.page}` : '';

  return (
    <Badge color="sage">
      {source.document}
      {page}
    </Badge>
  );
}
