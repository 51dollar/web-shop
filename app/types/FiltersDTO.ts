export interface FiltersDTO {
  models: {
    id: number;
    name: string;
  }[];

  priceRange: {
    min: number;
    max: number;
  };

  storage: number[];
  colors: string[];

  specifications: {
    ram: number[];
    os: string[];
    processor: string[];
    displaySize: number[];
    displayType: string[];
    batteryRange: {
      min: number;
      max: number;
    };
    releaseYearRange: {
      min: number;
      max: number;
    };
  };
}
