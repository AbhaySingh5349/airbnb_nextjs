'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const FormHeading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className="text-xl font-bold">{title}</div>
      <div className="font-light text-neutral-500">{subtitle}</div>
    </div>
  );
};

export default FormHeading;
