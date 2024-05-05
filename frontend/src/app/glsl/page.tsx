'use client';

import { ContentPadding } from '@/components/ContentPadding';
import { CloudShaderCanvas } from '@/components/Shaders/Cloud';
import { MarcherCanvas } from '@/components/Shaders/Marcher';

export default function GLSLTestPage() {
  return (
    <ContentPadding className="">
      <div>GLSL TEST PAGE</div>
      <div className="border h-[1000px] w-[1000px]">
        <MarcherCanvas />
      </div>
    </ContentPadding>
  );
}
