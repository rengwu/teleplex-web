'use client';

import { GenericReactHTMLNode } from '@/types';
import { DecoratedContent_Plain } from '@/types/components/content-block/interfaces/DecoratedContent';
import { ContentPadding } from '../ContentPadding';
import { cn } from '@/utils/common';
import { Button } from '../Button';
import { ButtonContainer } from '../ButtonContainer';

export function DecoratedContent({
  data,
  ...props
}: { data?: DecoratedContent_Plain } & GenericReactHTMLNode) {
  return (
    <div className="py-24">
      <ContentPadding className="" {...props}>
        <div className="grid lg:grid-cols-2">
          <div>
            <div className={cn('font-title font-semibold text-3xl', 'mb-8')}>
              {data?.mainContent}
            </div>
            <div className="mb-4">{data?.subContent}</div>

            <ButtonContainer>
              {data?.links.map((link) => (
                <Button href={link.href} key={link.label}>
                  {link.label}
                </Button>
              ))}
            </ButtonContainer>
          </div>
        </div>
      </ContentPadding>
    </div>
  );
}
