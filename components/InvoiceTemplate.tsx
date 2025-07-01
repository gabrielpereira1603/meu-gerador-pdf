import React from 'react'

export interface InvoiceItem {
  qty: string
  description: string
  value: string
  total: string
}

type CheckOpt = 'CIF' | 'FOB' | 'C&F'

interface Props {
  date: string
  page: string
  period: string
  invoiceNumber: string
  referenceNumber: string
  airWaybill: string
  knowledge: string
  recipient: string
  bankName: string
  bankAccount: string
  iban: string
  swift: string
  countryExport: string
  countryManufacture: string
  countryDestination: string
  currency: string
  checkOption: CheckOpt
  items: InvoiceItem[]
}

export const InvoiceTemplate: React.FC<Props> = ({
  date,
  page,
  period,
  invoiceNumber,
  referenceNumber,
  airWaybill,
  knowledge,
  recipient,
  bankName,
  bankAccount,
  iban,
  swift,
  countryExport,
  countryManufacture,
  countryDestination,
  currency,
  checkOption,
  items,
}) => {
  const totalSum = items
    .reduce((sum, x) => {
      const num = parseFloat(x.total.replace(/\./g, '').replace(',', '.')) || 0
      return sum + num
    }, 0)
    .toFixed(2)
    .replace('.', ',')

  const renderCheckbox = (opt: CheckOpt) =>
    `[${checkOption === opt ? 'X' : ' '}] ${opt}`

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, color: '#000' }}>
      {/* Cabeçalho */}
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          <tr>
            <td
              style={{
                border: '1px solid #000',
                padding: 6,
                width: '60%',
                background: '#ccc',
              }}
            >
              Date / Data: <u>{date}</u>
            </td>
            <td
              style={{
                border: '1px solid #000',
                padding: 6,
                textAlign: 'center',
                background: '#ccc',
              }}
            >
              COMMERCIAL INVOICE / Fatura Comercial
            </td>
            <td
              style={{
                border: '1px solid #000',
                padding: 6,
                width: '40%',
                textAlign: 'right',
                background: '#ccc',
              }}
            >
              Page {page} of / de {period}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Dados Empresa / Invoice */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 4 }}>
        <tbody>
          <tr>
            <td colSpan={2} style={{ border: '1px solid #000', padding: 4 }}>
              Company Name / Nome da Empresa
            </td>
            <td colSpan={2} style={{ border: '1px solid #000', padding: 4 }}>
              Invoice # / Número da Fatura: {invoiceNumber}
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{
                border: '1px solid #000',
                padding: 4,
                textAlign: 'center',
              }}
            >
              HARAS DI SARAGUA
              <br />
              FR25 87894931
            </td>
            <td colSpan={2} style={{ border: '1px solid #000', padding: 4 }}>
              Reference No. / No. de Referência: {referenceNumber}
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ border: '1px solid #000', padding: 4 }}>
              FedEx Express Air Waybill / Conhecimento Aéreo:
              <br />
              {airWaybill}
            </td>
            <td colSpan={2} style={{ border: '1px solid #000', padding: 4 }}>
              Conhecimento Aéreo:
              <br />
              {knowledge}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Shipper / Recipient */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 4 }}>
        <thead>
          <tr>
            <td
              style={{
                background: '#ccc',
                border: '1px solid #000',
                padding: 4,
                fontWeight: 'bold',
              }}
            >
              Shipper or Exporter / Remetente ou Exportador
            </td>
            <td
              style={{
                background: '#ccc',
                border: '1px solid #000',
                padding: 4,
                fontWeight: 'bold',
              }}
            >
              Recipient / Destinatário
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #000', padding: 4 }}>NIF: 304801682</td>
            <td style={{ border: '1px solid #000', padding: 4 }}>
              Name / Nome: {recipient}
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: 4 }}>
              Name / Nome: GUILHERME DE SOUSA PAULA
            </td>
            <td style={{ border: '1px solid #000', padding: 4 }}>
              Address / Endereço: 1220 ROUTE DE DIVONNE
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: 4 }}>
              Address / Endereço: RUA SACADURA CABRAL Nº 18 R/C D
            </td>
            <td style={{ border: '1px solid #000', padding: 4 }}>
              City, State, Zip / CEP: 01220 GRILLY
              <br />
              FRANÇA
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: 4 }}>
              City, State, Zip / CEP: 2635-257
              <br />
              Lisboa, Portugal
            </td>
            <td style={{ border: '1px solid #000', padding: 4 }}>Phone / Telefone:</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: 4 }}>
              Phone / Telefone: +351968678004
            </td>
            <td style={{ border: '1px solid #000', padding: 4 }}></td>
          </tr>
        </tbody>
      </table>

      {/* Bank / Check / País / Currency */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 4 }}>
        <thead>
          <tr>
            <td
              style={{
                background: '#ccc',
                border: '1px solid #000',
                padding: 4,
                fontWeight: 'bold',
              }}
            >
              BANK / BANCO
            </td>
            <td
              style={{
                background: '#ccc',
                border: '1px solid #000',
                padding: 4,
                fontWeight: 'bold',
              }}
            >
              Check One / Assinale uma opção:
            </td>
            <td
              style={{
                background: '#ccc',
                border: '1px solid #000',
                padding: 4,
                fontWeight: 'bold',
              }}
            >
              Country / País
            </td>
            <td
              style={{
                background: '#ccc',
                border: '1px solid #000',
                padding: 4,
                fontWeight: 'bold',
              }}
            >
              Currency / Moeda
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #000', padding: 4 }}>
              Name / {bankName}
              <br />
              Conta / {bankAccount}
            </td>
            <td style={{ border: '1px solid #000', padding: 4 }}>{renderCheckbox('CIF')}</td>
            <td style={{ border: '1px solid #000', padding: 4 }}>
              Country of Export: {countryExport}
            </td>
            <td style={{ border: '1px solid #000', padding: 4 }}>{currency}</td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: 4 }}>NIB / IBAN: {iban}</td>
            <td style={{ border: '1px solid #000', padding: 4 }}>{renderCheckbox('FOB')}</td>
            <td style={{ border: '1px solid #000', padding: 4 }}>
              Country of Manufacture: {countryManufacture}
            </td>
            <td style={{ border: '1px solid #000', padding: 4 }}></td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: 4 }}>
              BIC / SWIFT: {swift}
              <br />
              Cidade, País: Lisboa, Portugal
            </td>
            <td style={{ border: '1px solid #000', padding: 4 }}>{renderCheckbox('C&F')}</td>
            <td style={{ border: '1px solid #000', padding: 4 }}>
              Country of Destination: {countryDestination}
            </td>
            <td style={{ border: '1px solid #000', padding: 4 }}></td>
          </tr>
        </tbody>
      </table>

      {/* Itens de Trabalho */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 4 }}>
        <thead>
          <tr>
            <td
              colSpan={9}
              style={{
                background: '#ccc',
                border: '1px solid #000',
                padding: 4,
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              Information / Informações Sobre o Trabalho
            </td>
          </tr>
          <tr>
            <td style={{ border: '1px solid #000', padding: 4, fontWeight: 'bold' }}>
              Qty / Quantidade
            </td>
            <td style={{ border: '1px solid #000', padding: 4 }}></td>
            <td style={{ border: '1px solid #000', padding: 4 }}></td>
            <td style={{ border: '1px solid #000', padding: 4 }}></td>
            <td
              colSpan={3}
              style={{ border: '1px solid #000', padding: 4, textAlign: 'center', fontWeight: 'bold' }}
            >
              TRABALHO / WORK
            </td>
            <td style={{ border: '1px solid #000', padding: 4, textAlign: 'center', fontWeight: 'bold' }}>
              VALOR
            </td>
            <td style={{ border: '1px solid #000', padding: 4, textAlign: 'center', fontWeight: 'bold' }}>
              Total Value / Valor Total
            </td>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i}>
              <td style={{ border: '1px solid #000', padding: 4, textAlign: 'center' }}>{it.qty}</td>
              <td style={{ border: '1px solid #000', padding: 4 }}></td>
              <td style={{ border: '1px solid #000', padding: 4 }}></td>
              <td style={{ border: '1px solid #000', padding: 4 }}></td>
              <td
                colSpan={3}
                style={{ border: '1px solid #000', padding: 4, textAlign: 'center' }}
              >
                {it.description}
              </td>
              <td style={{ border: '1px solid #000', padding: 4, textAlign: 'right' }}>
                {it.value}
              </td>
              <td style={{ border: '1px solid #000', padding: 4, textAlign: 'right' }}>
                {it.total}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={8} style={{ border: '1px solid #000', padding: 4, textAlign: 'right', fontWeight: 'bold' }}>
              Total / Valor total da fatura
            </td>
            <td style={{ border: '1px solid #000', padding: 4, textAlign: 'right', fontWeight: 'bold' }}>
              {totalSum}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Rodapé */}
      <p style={{ marginTop: 20, borderTop: '1px solid #000', paddingTop: 6 }}>
        <strong>Signature of shipper/exporter / Assinatura do remetente ou exportador</strong>
      </p>
      <p style={{ fontSize: 10 }}>
        I declare all the information contained in this invoice to be true and correct /<br />
        Declaro serem verdadeiras todas as informações contidas nesta fatura
      </p>
    </div>
  )
}
