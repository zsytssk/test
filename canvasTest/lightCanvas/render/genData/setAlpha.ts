let globalAlpha = 1;
export function setAlpha(alpha: number) {
    return (globalAlpha *= alpha);
}
