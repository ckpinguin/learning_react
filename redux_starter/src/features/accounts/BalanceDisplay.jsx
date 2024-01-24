import { connect } from "react-redux"
function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

function BalanceDisplay({ balance }) {
  return <div className="balance">{formatCurrency(balance)}</div>
}

// old way (before hooks)
function mapStateToProps(state) {
  return {
    balance: state.account.balance,
  }
}

// old way (before hooks)
export default connect(mapStateToProps)(BalanceDisplay)
