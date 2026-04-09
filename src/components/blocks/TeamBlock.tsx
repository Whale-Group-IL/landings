import Image from 'next/image';
import type { TeamBlock as TeamBlockData, TenantTheme } from '@/types/tenant';

interface Props {
  data: TeamBlockData;
  theme: TenantTheme;
}

export function TeamBlock({ data, theme }: Props) {
  return (
    <section className="py-16 md:py-24 bg-white px-4">
      <div className="max-w-4xl mx-auto">
        {data.title && (
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
            {data.title}
          </h2>
        )}

        <div className="flex flex-wrap justify-center gap-10">
          {data.members.map((member, i) => (
            <div key={i} className="text-center max-w-xs">
              {member.avatar ? (
                <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 shadow">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-28 h-28 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {member.name.charAt(0)}
                </div>
              )}

              <p className="font-bold text-lg text-gray-900">{member.name}</p>
              <p className="text-sm mt-1 leading-snug" style={{ color: theme.primaryColor }}>
                {member.role}
              </p>
              {member.bio && (
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{member.bio}</p>
              )}
              {member.linkedinUrl && (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
