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

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {data.members.map((member, i) => (
            <div key={i} className="text-center">
              {member.avatar && (
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 shadow">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              {!member.avatar && (
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  {member.name.charAt(0)}
                </div>
              )}
              <p className="font-semibold text-gray-900">{member.name}</p>
              <p className="text-sm" style={{ color: theme.primaryColor }}>
                {member.role}
              </p>
              {member.bio && (
                <p className="text-xs text-gray-500 mt-2">{member.bio}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
