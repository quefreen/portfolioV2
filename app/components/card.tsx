function ContentCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="col-span-12 rounded-[48px] bg-white p-8">
      <div className="grid grid-cols-12 gap-x-6 gap-y-6">
        {/* Rail de conteúdo (col-10) */}
        <div className="col-span-12 lg:col-start-2 lg:col-span-10">
          <p className="text-xl font-semibold leading-[1.4] text-black">
            {title}
          </p>
          <p className="mt-2 text-xl leading-[1.4] text-black">{body}</p>
        </div>

        {/* Exemplo: shape/mídia que pode usar col-12 */}
        <div className="col-span-12">
          <div className="h-40 w-full rounded-[32px] bg-[#D9D9D9]" />
        </div>
      </div>
    </div>
  );
}
