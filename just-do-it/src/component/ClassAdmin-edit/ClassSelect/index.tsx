import { Class } from "@/types/class";


interface ClassSelectProps {
    classes: Class[];
    selectedClassId: string | null;
    loading: boolean;
    onClassSelect: (classId: string) => void;
    error: string | null;
  }
  
  const ClassSelect: React.FC<ClassSelectProps> = ({
    classes,
    selectedClassId,
    loading,
    onClassSelect,
    error,
  }) => (
    <div>
      <label htmlFor="class-dropdown" className="block text-sm font-medium text-gray-700">
        Seleccionar Clase
      </label>
      <select
        id="class-dropdown"
        onChange={(e) => onClassSelect(e.target.value)}
        value={selectedClassId || ""}
        className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="" disabled>
          {loading ? "Cargando clases..." : "Selecciona una clase"}
        </option>
        {classes.map((cls) => (
          <option key={cls.id} value={cls.id}>
            {cls.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
  
  export default ClassSelect;
  