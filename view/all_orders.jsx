const React = require("react");
const DataAllOrders = require('../data/orders_leo.json')

class AllOrders extends React.Component
{
    filter_orders()
    {
        this.allOrdersFilter = DataAllOrders

        let i = 1;
        let html;
        while(i < 3)
        {
            html += `<tr>
                <td>leron</td>
                <td>leron</td>
                <td>leron</td>
                <td>leron</td>
                <td>leron</td>
                <td>leron</td>
                <td>leron</td>
                <td>leron</td>
                <td>leron</td>
            </tr>`
            i++;
        }

        return html;
    }

    render()
    {
        return(
            <div>
                <table>
                    <tr>
                        <th>FECHA</th>
                        <th>PAR MONEDA</th>
                        <th>TIPO</th>
                        <th>MONTO INVERTIDO CLP</th>
                        <th>TRN MONEDA CRYPTO</th>
                        <th>COSTO MONEDA CRYPTO/CLP</th>
                        <th>COMISION CRYPTO</th>
                        <th>COMISION CLP</th>
                        <th>BALANCE CRYPTO</th>
                    </tr>
                </table>

                <tbody>
                    {this.filter_orders()}
                </tbody>
            </div>
        )
    }
}

module.exports = AllOrders;