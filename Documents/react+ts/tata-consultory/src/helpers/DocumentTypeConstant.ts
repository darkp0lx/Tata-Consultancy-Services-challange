export interface iDocumentType {
  code: "0" | "1" | "2" | "6" | "7" | "8" | "9";
  codeText: "DNI" | "CE" | "PAS" | "PTP" | "CRE" | "CIE" | "CSR";
  name: string;
  pattern: string;
  regex: RegExp;
  maxLength: number;
}

export class DocumentTypeConstant {
  DNI: iDocumentType = {
    code: '0', codeText: "DNI",
    name: 'DNI',
    pattern: '[0-9]{8}', regex: /[^0-9]/g,
    maxLength: 8,
  };

  CE: iDocumentType = {
    code: '1', codeText: "CE",
    name: 'Carnet de extranjería',
    pattern: '[A-Za-z0-9]{3,15}', regex: /[^A-Za-z0-9]/g,
    maxLength: 15,
  };

  PAS: iDocumentType = {
    code: '2', codeText: "PAS",
    name: 'Pasaporte',
    pattern: '[A-Za-z0-9]{5,15}', regex: /[^A-Za-z0-9]/g,
    maxLength: 15,
  };

  PTP: iDocumentType = {
    code: '6', codeText: "PTP",
    name: 'Permiso temporal de permanencia (PTP)',
    pattern: '[A-Za-z0-9]{3,15}', regex: /[^A-Za-z0-9]/g,
    maxLength: 15,
  };

  CRE: iDocumentType = {
    code: '7', codeText: "CRE",
    name: 'Carnet de identidad de relaciones exteriores (CRE)',
    pattern: '[0-9]{8}', regex: /[^0-9]/g,
    maxLength: 8,
  };

  CIE: iDocumentType = {
    code: '8', codeText: "CIE",
    name: 'Cédula de identidad de extranjero (CIE)',
    pattern: '[A-Za-z0-9]{8,9}', regex: /[^A-Za-z0-9]/g,
    maxLength: 9,
  };

  CSR: iDocumentType = {
    code: '9', codeText: "CSR",
    name: 'Carnet de solicitante de refugio (CSR)',
    pattern: '[0-9]{8,9}', regex: /[^0-9]/g,
    maxLength: 9,
  };

  get listMainDocuments(): Array<iDocumentType> {
    return [
      this.DNI,
      this.CE,
      this.PAS,
      this.PTP,
    ]
  }

  get listAllDocuments(): Array<iDocumentType> {
    return [
      this.DNI,
      this.CE,
      this.PAS,
      this.PTP,
      this.CRE,
      this.CIE,
      this.CSR,
    ]
  }

  getDocumentByCode(code: string): iDocumentType | undefined {
    return this.listMainDocuments.find((document) => document.code === code)
  }

  getDocumentByCodeText(codeText: string): iDocumentType | undefined {
    return this.listMainDocuments.find((document) => document.codeText === codeText)
  }
}
