interface Props {
  total: number;
  ny: number;
  granskad: number;
  kontaktad: number;
}

export default function AdminStats({ total, ny, granskad, kontaktad }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">

      {/* TOTAL */}
      <div className="p-6 bg-white rounded-xl shadow border border-blue-100">
        <p className="text-blue-700 font-semibold text-lg">Totalt</p>
        <p className="text-4xl font-bold mt-2">{total}</p>
      </div>

      {/* NYA */}
      <div className="p-6 bg-white rounded-xl shadow border border-yellow-100">
        <p className="text-yellow-600 font-semibold text-lg">Nya</p>
        <p className="text-4xl font-bold mt-2">{ny}</p>
      </div>

      {/* GRANSKADE */}
      <div className="p-6 bg-white rounded-xl shadow border border-purple-100">
        <p className="text-purple-600 font-semibold text-lg">Granskade</p>
        <p className="text-4xl font-bold mt-2">{granskad}</p>
      </div>

      {/* KONTAKTADE */}
      <div className="p-6 bg-white rounded-xl shadow border border-green-100">
        <p className="text-green-600 font-semibold text-lg">Kontaktade</p>
        <p className="text-4xl font-bold mt-2">{kontaktad}</p>
      </div>

    </div>
  );
}
