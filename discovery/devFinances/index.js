const Modal = {
    modalOverlay: document.querySelector(".modal-overlay"),
    open() {
        // Abrir modal
        // Adicionar a class active ao modal
        // this.classList.add("active");
        this.modalOverlay.classList.add("active");
    },
    close(){
        // fechar o modal
        // remover a class active do modal
        this.modalOverlay.classList.remove("active");
    }
}