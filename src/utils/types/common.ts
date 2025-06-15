export enum ObjectType {
  ROCKET_BODY = "ROCKET BODY",
  DEBRIS = "DEBRIS",
  UNKNOWN = "UNKNOWN",
  PAYLOAD = "PAYLOAD",
}
export enum OrbitCode {
  LEO = "LEO",
  LEO1 = "LEO1",
  LEO2 = "LEO2",
  LEO3 = "LEO3",
  LEO4 = "LEO4",
  MEO = "MEO",
  GEO = "GEO",
  HEO = "HEO",
  IGO = "IGO",
  EGO = "EGO",
  NSO = "NSO",
  GTO = "GTO",
  GHO = "GHO",
  HAO = "HAO",
  MGO = "MGO",
  LMO = "LMO",
  UFO = "UFO",
  ESO = "ESO",
  UNKNOWN = "UNKNOWN",
}

export interface Column {
  key: string;
  label: string;
}
export interface SortPayload {
  key: string;
  order: "asc" | "desc" | null;
}
