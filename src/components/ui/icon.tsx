import type { LucideProps } from 'lucide-react';
import { iconIndex } from './icon-index';

interface IconProps extends LucideProps {
  name: string;
}

// A helper function to convert kebab-case or snake_case to PascalCase
const toPascalCase = (str: string) => {
  if (!str) return '';
  return str.replace(/(^|-|_)(.)/g, (match, sep, char) => char.toUpperCase());
};

const Icon = ({ name, ...props }: IconProps) => {
  const PascalCaseName = toPascalCase(name);
  const IconComponent = iconIndex[PascalCaseName as keyof typeof iconIndex];

  if (!IconComponent) {
    // Fallback to a default icon if the name is not found
    const DefaultIcon = iconIndex['Atom'];
    return <DefaultIcon {...props} />;
  }

  return <IconComponent {...props} />;
};

export default Icon;
