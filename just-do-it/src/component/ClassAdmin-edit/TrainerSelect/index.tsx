import { Trainer } from "@/types/class";

interface TrainerSelectProps {
    trainers: Trainer[];
    selectedTrainerId: string;
    loading: boolean;
    onTrainerSelect: (trainerId: string) => void;
  }

  const TrainerSelect: React.FC<TrainerSelectProps> = ({
    trainers,
    selectedTrainerId,
    loading,
    onTrainerSelect,
  }) => (
    <div>
      <label htmlFor="trainer-dropdown" className="block text-sm font-medium text-gray-700">
        Entrenador
      </label>
      <select
        id="trainer-dropdown"
        onChange={(e) => onTrainerSelect(e.target.value)}
        value={selectedTrainerId}
        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="" disabled>
          {loading ? "Cargando entrenadores..." : "Selecciona un entrenador"}
        </option>
        {trainers.map((trainer) => (
          <option key={trainer.id} value={trainer.id}>
            {trainer.name}
          </option>
        ))}
      </select>
    </div>
  );

  export default TrainerSelect;