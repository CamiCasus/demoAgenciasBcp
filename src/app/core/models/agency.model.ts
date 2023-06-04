export interface Agency {
  id: number;
  agencia: string;
  distrito: string;
  provincia: string;
  departamento: string;
  direccion: string;
  lat: number;
  lon: number;

  isFavorite: boolean;
}
