import './CheckMark.css';

export default function CheckMark() {
    return (
        <div className="check-mark">
            <svg viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="green" />
                <path className="checkmark-check" fill="none" d="M14 27l7 7 16-16" />
            </svg>
        </div>
    );
}
