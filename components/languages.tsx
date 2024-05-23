'use client'
import { useTheme } from 'next-themes';
import Image from 'next/image';

const languages = [
  {
    srcLight: '/language/stripe.png',
    srcDark: '/language/stripe.png',
    className: 'px-2 opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out'
  },
  {
    srcLight: '/language/resend-dark.png',
    srcDark: '/language/resend-light.png',
    className: 'px-2 opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out'
  },
  {
    srcLight: '/language/next-dark.png',
    srcDark: '/language/next-light.png',
    className: 'px-2 opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out'
  },
  {
    srcLight: '/language/tailwind.png',
    srcDark: '/language/tailwind.png',
    className: 'px-2 opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out'
  },
];

export function Language() {
  const { theme } = useTheme();

  return (
    <section id="press">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          
          <div className="relative mt-6">
            <div className="grid grid-cols-2 place-items-center gap-2 md:gap-4 lg:grid-cols-4 xl:gap-x-6 2xl:grid-cols-8">
              {languages.map((language, idx) => (
                <Image
                  key={idx}
                  src={theme === 'light' ? language.srcLight : language.srcDark}
                  className={language.className}
                  alt="logo"
                  height={80}
                  width={260}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
