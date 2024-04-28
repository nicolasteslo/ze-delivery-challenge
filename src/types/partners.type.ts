export interface IPartnerAddress {
  type: "string";
  coordinates: [number, number];
}

export interface IPartnerCoverageArea {
  type: "string";
  coordinates: number[][][][];
}

export interface IPartner {
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: IPartnerCoverageArea;
  address: IPartnerAddress;
}
