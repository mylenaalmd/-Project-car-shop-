import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public createMotorcycle = async (motorcycle: IMotorcycle) => {
    const motorcycleODM = new MotorcycleODM();
    if (!motorcycle.status) {
      const newMotorcycle = await motorcycleODM.create({ ...motorcycle, status: false });
      return this.createMotorcycleDomain(newMotorcycle);
    }
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    const obj = this.createMotorcycleDomain(newMotorcycle);
    return obj;
  };

  public findAllMotorcycle = async () => {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.find();
    const ajustMotorcycleId = motorcycle.map((item) => ({
      id: item._id,
      model: item.model,
      year: item.year,
      color: item.color,
      status: item.status,
      buyValue: item.buyValue,
      category: item.category,
      engineCapacity: item.engineCapacity,
    }));
    return ajustMotorcycleId;
  };

  public findMotorcycleById = async (id: string) => {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findById(id);
    if (motorcycle) {
      const ajustmotorcycleId = {
        id: motorcycle._id,
        model: motorcycle.model,
        year: motorcycle.year,
        color: motorcycle.color,
        status: motorcycle.status,
        buyValue: motorcycle.buyValue,
        category: motorcycle.category,
        engineCapacity: motorcycle.engineCapacity,
      };
      return ajustmotorcycleId;
    }
    return null;
  };

  public updateMotorcycle = async (id: string, motorcycle: IMotorcycle) => {
    const motorcycleODM = new MotorcycleODM();
    const motorcycleUpdated = await motorcycleODM.update(id, motorcycle);
    if (motorcycleUpdated) {
      const ajustmotorcycleId = {
        id: motorcycleUpdated._id,
        model: motorcycleUpdated.model,
        year: motorcycleUpdated.year,
        color: motorcycleUpdated.color,
        status: motorcycleUpdated.status,
        buyValue: motorcycleUpdated.buyValue,
        category: motorcycleUpdated.category,
        engineCapacity: motorcycleUpdated.engineCapacity,
      };
      return ajustmotorcycleId;
    }
  };

  public deleteMotorcycleById = async (id: string) => {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await this.findMotorcycleById(id);
    if (!motorcycle) {
      return { message: 'Motorcycle not found' };
    }
    await motorcycleODM.delete(id);
    return null;
  };
}

export default MotorcycleService;