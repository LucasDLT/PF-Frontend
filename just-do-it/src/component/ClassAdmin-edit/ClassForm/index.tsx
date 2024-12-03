import { Class } from "@/types/class";


interface ClassFormProps {
    selectedClass: Class;
    onClassChange: (updatedClass: Class) => void;
  }
  
  const ClassForm: React.FC<ClassFormProps> = ({ selectedClass, onClassChange }) => (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Detalles de la Clase</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="class-name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            id="class-name"
            type="text"
            value={selectedClass.name}
            onChange={(e) =>
              onClassChange({ ...selectedClass, name: e.target.value })
            }
            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
  
  export default ClassForm;
  