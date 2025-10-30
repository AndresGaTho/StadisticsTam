import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-signature-modal',
  templateUrl: './signature-modal.component.html',
  styleUrls: ['./signature-modal.component.css'],
  imports:[CommonModule]
})
export class SignatureModalComponent implements AfterViewInit {
  @ViewChild('signatureCanvas', { static: false }) signatureCanvas!: ElementRef<HTMLCanvasElement>;
  @Output() signatureSaved = new EventEmitter<string>();
  @Output() modalClosed = new EventEmitter<void>();

  isVisible = false;
  private ctx: CanvasRenderingContext2D | null = null;
  private isDrawing = false;
  private lastX = 0;
  private lastY = 0;

  ngAfterViewInit() {
    this.initCanvas();
  }

  private initCanvas() {
    if (this.signatureCanvas) {
      const canvas = this.signatureCanvas.nativeElement;
      this.ctx = canvas.getContext('2d');
      
      if (this.ctx) {
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
      }
    }
  }

  open() {
    this.isVisible = true;
    setTimeout(() => {
      this.initCanvas();
      this.clearSignature();
    }, 100);
  }

  close() {
    this.isVisible = false;
    this.modalClosed.emit();
  }

  startDrawing(event: MouseEvent | TouchEvent) {
    this.isDrawing = true;
    const coords = this.getCoordinates(event);
    this.lastX = coords.x;
    this.lastY = coords.y;
  }

  draw(event: MouseEvent | TouchEvent) {
    if (!this.isDrawing || !this.ctx) return;

    event.preventDefault();
    
    const coords = this.getCoordinates(event);
    
    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(coords.x, coords.y);
    this.ctx.stroke();

    this.lastX = coords.x;
    this.lastY = coords.y;
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  private getCoordinates(event: MouseEvent | TouchEvent): { x: number, y: number } {
    const canvas = this.signatureCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    
    let clientX: number, clientY: number;
    
    if (event instanceof TouchEvent) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  clearSignature() {
    if (this.ctx) {
      const canvas = this.signatureCanvas.nativeElement;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  saveSignature() {
    if (this.signatureCanvas) {
      const dataURL = this.signatureCanvas.nativeElement.toDataURL('image/png');
      this.signatureSaved.emit(dataURL);
      this.close();
    }
  }

  hasSignature(): boolean {
    if (!this.signatureCanvas || !this.ctx) return false;
    
    const canvas = this.signatureCanvas.nativeElement;
    const imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] !== 0) {
        return true;
      }
    }
    
    return false;
  }

  handleTouchStart(event: TouchEvent) {
    event.preventDefault();
    this.startDrawing(event);
  }

  handleTouchMove(event: TouchEvent) {
    event.preventDefault();
    this.draw(event);
  }

  handleTouchEnd(event: TouchEvent) {
    event.preventDefault();
    this.stopDrawing();
  }
}