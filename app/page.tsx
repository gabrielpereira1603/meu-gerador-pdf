'use client'

import React, { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { InvoiceTemplate, InvoiceItem } from '@/components/InvoiceTemplate'

export default function Page() {
  const refInvoice = useRef<HTMLDivElement>(null)

  // campos dinâmicos (agora editáveis)
  const [date, setDate] = useState('03/06/2025')
  const [page, setPage] = useState('3')
  const [period, setPeriod] = useState('06/2025')

  const [invoiceNumber, setInvoiceNumber] = useState('003')
  const [referenceNumber, setReferenceNumber] = useState('003')
  const [airWaybill, setAirWaybill] = useState('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  const [knowledge, setKnowledge] = useState('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  const [recipient, setRecipient] = useState('HARAS DI SARAGUA')

  const [bankName, setBankName] = useState('MILLENNIUM')
  const [bankAccount, setBankAccount] = useState('003300004576033297105')
  const [iban, setIban] = useState('DE49 1001 1001 2107 8199 90')
  const [swift, setSwift] = useState('BCOMPTPL')
  const [countryExport, setCountryExport] = useState('FRANCA')
  const [countryManufacture, setCountryManufacture] = useState('FRANCA')
  const [countryDestination, setCountryDestination] = useState('Portugal')
  const [currency, setCurrency] = useState('EURO')

  const [checkOption, setCheckOption] = useState<'' | 'CIF' | 'FOB' | 'C&F'>('')

  const [items, setItems] = useState<InvoiceItem[]>([
    { qty: '01', description: 'WORK WITH ANIMALS', value: '870,00', total: '870,00' },
    { qty: '01', description: 'SOCIAL SECURITY', value: '23%', total: '200,10' },
  ])

  const handleItemChange = (idx: number, field: keyof InvoiceItem, value: string) => {
    const copy = [...items]
    copy[idx] = { ...copy[idx], [field]: value }
    setItems(copy)
  }

  const addItem = () => {
    setItems([...items, { qty: '', description: '', value: '', total: '' }])
  }

  const removeItem = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx))
  }

  const downloadPdf = async () => {
    if (!refInvoice.current) return
    const canvas = await html2canvas(refInvoice.current, { scale: 2 })
    const img = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'pt', 'a4')
    const w = pdf.internal.pageSize.getWidth()
    const h = (canvas.height * w) / canvas.width
    pdf.addImage(img, 'PNG', 0, 0, w, h)
    pdf.save(`invoice_${invoiceNumber}.pdf`)
  }

  return (
    <div className="min-h-screen bg-gray-800 text-white p-8 space-y-6">
      <h1 className="text-2xl font-bold">Preencha a Fatura</h1>

      {/* Formulário de campos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Date / Data', value: date, onChange: setDate },
          { label: 'Page / Página', value: page, onChange: setPage },
          { label: 'Period / Período (ex: 06/2025)', value: period, onChange: setPeriod },

          { label: 'Invoice # / Número da Fatura', value: invoiceNumber, onChange: setInvoiceNumber },
          { label: 'Reference No. / No. de Referência', value: referenceNumber, onChange: setReferenceNumber },
          { label: 'FedEx Air Waybill', value: airWaybill, onChange: setAirWaybill },
          { label: 'Conhecimento Aéreo', value: knowledge, onChange: setKnowledge },
          { label: 'Recipient / Destinatário', value: recipient, onChange: setRecipient },
        ].map(({ label, value, onChange }) => (
          <label key={label} className="block">
            <span className="block mb-1">{label}:</span>
            <input
              className="w-full border border-gray-600 rounded p-2 bg-gray-900 placeholder-gray-500"
              value={value}
              onChange={e => onChange(e.target.value)}
            />
          </label>
        ))}

        <label className="block">
          <span className="block mb-1">Check One / Assinale uma opção:</span>
          <select
              className="w-full border border-gray-600 rounded p-2 bg-gray-900"
              value={checkOption}
              onChange={e => setCheckOption(e.target.value as any)}
          >
            <option value="">-- Nenhuma opção --</option>
            <option value="CIF">CIF</option>
            <option value="FOB">FOB</option>
            <option value="C&F">C&amp;F</option>
          </select>
        </label>

        {[
          { label: 'Bank Name / Nome do Banco', value: bankName, onChange: setBankName },
          { label: 'Conta / Account', value: bankAccount, onChange: setBankAccount },
          { label: 'IBAN / NIB', value: iban, onChange: setIban },
          { label: 'SWIFT / BIC', value: swift, onChange: setSwift },
          { label: 'Country of Export / País exportador', value: countryExport, onChange: setCountryExport },
          { label: 'Country of Manufacture / País de fabricação', value: countryManufacture, onChange: setCountryManufacture },
          { label: 'Country of Destination / País de Destino', value: countryDestination, onChange: setCountryDestination },
          { label: 'Currency / Moeda', value: currency, onChange: setCurrency },
        ].map(({ label, value, onChange }) => (
          <label key={label} className="block">
            <span className="block mb-1">{label}:</span>
            <input
              className="w-full border border-gray-600 rounded p-2 bg-gray-900 placeholder-gray-500"
              value={value}
              onChange={e => onChange(e.target.value)}
            />
          </label>
        ))}
      </div>

      {/* Itens de Trabalho */}
      <div className="bg-gray-700 p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Informações Sobre o Trabalho</h2>
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Qty / Quantidade</th>
              <th className="border p-2">Trabalho / Work</th>
              <th className="border p-2">Valor</th>
              <th className="border p-2">Valor Total</th>
              <th className="border p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i}>
                <td className="border p-2">
                  <input
                    className="w-full bg-gray-800 rounded p-1"
                    value={it.qty}
                    onChange={e => handleItemChange(i, 'qty', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    className="w-full bg-gray-800 rounded p-1"
                    value={it.description}
                    onChange={e => handleItemChange(i, 'description', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    className="w-full bg-gray-800 rounded p-1"
                    value={it.value}
                    onChange={e => handleItemChange(i, 'value', e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    className="w-full bg-gray-800 rounded p-1"
                    value={it.total}
                    onChange={e => handleItemChange(i, 'total', e.target.value)}
                  />
                </td>
                <td className="border p-2 text-center">
                  <button
                    className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                    onClick={() => removeItem(i)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white"
          onClick={addItem}
        >
          Adicionar Item
        </button>
      </div>

      <button
        className="mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
        onClick={downloadPdf}
      >
        Gerar PDF
      </button>

      {/* Preview PARA O PDF — sem oklch */}
      <div
        ref={refInvoice}
        style={{
          width: 800,
          backgroundColor: '#ffffff',
          color: '#000000',
          padding: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          overflow: 'auto',
        }}
      >
        <InvoiceTemplate
          date={date}
          page={page}
          period={period}
          invoiceNumber={invoiceNumber}
          referenceNumber={referenceNumber}
          airWaybill={airWaybill}
          knowledge={knowledge}
          recipient={recipient}
          bankName={bankName}
          bankAccount={bankAccount}
          iban={iban}
          swift={swift}
          countryExport={countryExport}
          countryManufacture={countryManufacture}
          countryDestination={countryDestination}
          currency={currency}
          checkOption={checkOption}
          items={items}
        />
      </div>
    </div>
  )
}
