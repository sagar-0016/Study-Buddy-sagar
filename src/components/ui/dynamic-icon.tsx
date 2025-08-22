
"use client";

import { icons } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { Atom } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  // Convert kebab-case or snake_case to PascalCase
  const pascalCaseName = name.replace(/(^|-|_)(.)/g, (match, sep, char) => char.toUpperCase());
  
  const IconComponent = icons[pascalCaseName as keyof typeof icons];

  if (!IconComponent) {
    // Return a default icon if the specified one doesn't exist
    return <Atom {...props} />;
  }

  return <IconComponent {...props} />;
};

export default DynamicIcon;
