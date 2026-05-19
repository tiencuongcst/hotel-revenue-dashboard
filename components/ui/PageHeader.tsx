type Props = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: Props) {
  return (
    <section className='mb-6'>
      <h1 className='text-2xl font-bold text-[#212529]'>
        {title}
      </h1>

      {description ? (
        <p className='mt-1 text-sm text-[#6c757d]'>
          {description}
        </p>
      ) : null}
    </section>
  );
}
