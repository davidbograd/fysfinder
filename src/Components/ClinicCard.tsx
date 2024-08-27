import { FaStar, FaCheck, FaTimes, FaQuestion } from "react-icons/fa";

interface Props {
  klinikNavn: string;
  antalBehandlere: string;
  ydernummer: string;
  førsteKons: string;
  avgRating: number;
  ratingCount: number;
}

const ClinicCard: React.FC<Props> = ({
  klinikNavn,
  antalBehandlere,
  ydernummer,
  førsteKons,
  avgRating,
  ratingCount,
}) => {
  const getYdernummerIcon = () => {
    if (ydernummer === "Ja") return <FaCheck className="text-green-500" />;
    if (ydernummer === "Nej") return <FaTimes className="text-red-500" />;
    return <FaQuestion className="text-gray-500" />;
  };

  return (
    <div className="p-4 rounded-md border hover:shadow-lg transition-shadow duration-200">
      <h2 className="text-primary-blue text-lg font-semibold mb-2">
        {klinikNavn}
      </h2>
      <div className="flex items-center mb-2">
        <FaStar className="text-yellow-400 mr-1" />
        <span className="text-gray-700 mr-2">{avgRating.toFixed(1)}</span>
        <span className="text-gray-500">({ratingCount} anmeldelser)</span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <p
          className={`text-slate-700 ${
            antalBehandlere === "-" ? "text-gray-300" : ""
          }`}
        >
          {antalBehandlere === "-" ? "?" : antalBehandlere} behandlere
        </p>
        <div className="flex items-center">
          <span className="mr-2 text-sm">Ydernummer</span>
          {getYdernummerIcon()}
        </div>
      </div>
      <p className="text-slate-700 mt-2 text-sm">{førsteKons} kr</p>
    </div>
  );
};

export default ClinicCard;
