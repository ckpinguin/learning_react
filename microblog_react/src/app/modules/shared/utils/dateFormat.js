export default function formatDate(date) {
    return new Date(date).toLocaleDateString('de-CH', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).split(' ').join(' ');
}
