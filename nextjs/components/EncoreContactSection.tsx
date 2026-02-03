import { getEncoreContact } from '@/lib/sanity/client';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity/client';

export async function EncoreContactSection() {
  const contact = await getEncoreContact();

  if (!contact) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur rounded-lg p-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {contact.logo && (
              <div className="w-32 h-32 relative flex-shrink-0">
                <Image
                  src={urlFor(contact.logo).width(128).height(128).url()}
                  alt={contact.logo.alt || contact.companyName}
                  width={128}
                  height={128}
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-2">{contact.companyName}</h3>
              {contact.description && (
                <p className="text-gray-300 mb-4">{contact.description}</p>
              )}
              <div className="space-y-2">
                {contact.contactPerson && (
                  <p className="text-gray-200">
                    <span className="font-semibold">Contact:</span> {contact.contactPerson}
                  </p>
                )}
                {contact.email && (
                  <p className="text-gray-200">
                    <span className="font-semibold">Email:</span>{' '}
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {contact.email}
                    </a>
                  </p>
                )}
                {contact.phone && (
                  <p className="text-gray-200">
                    <span className="font-semibold">Phone:</span>{' '}
                    <a href={`tel:${contact.phone}`} className="text-blue-400 hover:text-blue-300">
                      {contact.phone}
                    </a>
                  </p>
                )}
                {contact.website && (
                  <p className="text-gray-200">
                    <span className="font-semibold">Website:</span>{' '}
                    <a
                      href={contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      {contact.website}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
