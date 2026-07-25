type RGBColorFn = (r: number, g: number, b: number) => string;

class PhotoParticle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  radius: number;
  color: string;
  vx: number;
  vy: number;
  friction = 0.85;
  springConstant = 0.025;
  maxSpeed = 30;
  minDesiredSpeed = 0.01;
  orbitAngle: number;
  orbitSpeed = 0.2;
  orbitRadius: number;
  time: number;

  constructor(x: number, y: number, radius: number, color: string, homeX: number, homeY: number) {
    this.x = x;
    this.y = y;
    this.homeX = homeX;
    this.homeY = homeY;
    this.radius = radius;
    this.color = color;

    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;

    this.orbitAngle = Math.random() * Math.PI * 2;
    this.orbitRadius = 0.5 + Math.random() * 1;
    this.time = Math.random() * 1000;
  }

  update(canvasWidth = 0, canvasHeight = 0) {
    this.time += 0.016;

    const orbitX = this.homeX + Math.cos(this.orbitAngle) * this.orbitRadius;
    const orbitY = this.homeY + Math.sin(this.orbitAngle) * this.orbitRadius;
    this.orbitAngle += this.orbitSpeed * 0.01;

    const dx = this.x - orbitX;
    const dy = this.y - orbitY;

    this.vx += -dx * this.springConstant;
    this.vy += -dy * this.springConstant;

    this.x += this.vx;
    this.y += this.vy;

    if (canvasWidth && canvasHeight) {
      const margin = 5;
      if (this.x - this.radius < margin) {
        this.x = margin + this.radius;
        this.vx *= -0.8;
      }
      if (this.x + this.radius > canvasWidth - margin) {
        this.x = canvasWidth - margin - this.radius;
        this.vx *= -0.8;
      }
      if (this.y - this.radius < margin) {
        this.y = margin + this.radius;
        this.vy *= -0.8;
      }
      if (this.y + this.radius > canvasHeight - margin) {
        this.y = canvasHeight - margin - this.radius;
        this.vy *= -0.8;
      }
    }

    this.vx *= this.friction;
    this.vy *= this.friction;

    const currentSpeed = Math.hypot(this.vx, this.vy);
    if (currentSpeed < this.minDesiredSpeed) {
      this.vx += (Math.random() - 0.5) * 0.001;
      this.vy += (Math.random() - 0.5) * 0.001;
    }

    if (currentSpeed > this.maxSpeed) {
      this.vx = (this.vx / currentSpeed) * this.maxSpeed;
      this.vy = (this.vy / currentSpeed) * this.maxSpeed;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export interface PhotoParticleControllerOptions {
  featuredImageEl: HTMLElement;
  imgEl: HTMLImageElement;
  imageSrc: string;
  touchInfluenceRadius?: number;
  touchMaxForce?: number;
  particleSamplingStep?: number;
  particleBaseRadius?: number;
  particleColor?: RGBColorFn;
}

export class PhotoParticleController {
  private featuredImageEl: HTMLElement;
  private originalImage: HTMLImageElement;
  private imageSrc: string;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: PhotoParticle[] = [];
  private imageData: ImageData | null = null;
  private animationId: number | null = null;
  private resizeHandler: (() => void) | null = null;
  private observer: IntersectionObserver | null = null;
  private visible = true;

  private isDragging = false;
  private touchX = 0;
  private touchY = 0;
  private touchForce = 0;
  private touchMaxForce: number;
  private touchForceIncrease = 1.2;
  private touchForceDecay = 0.88;
  private touchInfluenceRadius: number;

  private particleSamplingStep: number;
  private particleBaseRadius: number;
  private particleColor: RGBColorFn;

  particlesEnabled = true;

  constructor(options: PhotoParticleControllerOptions) {
    this.featuredImageEl = options.featuredImageEl;
    this.originalImage = options.imgEl;
    this.imageSrc = options.imageSrc;
    this.touchMaxForce = options.touchMaxForce ?? 80;
    this.touchInfluenceRadius = options.touchInfluenceRadius ?? 120;
    this.particleSamplingStep = options.particleSamplingStep ?? 2;
    this.particleBaseRadius = options.particleBaseRadius ?? 1.8;
    this.particleColor = options.particleColor ?? ((r, g, b) => `rgba(${r}, ${g}, ${b}, 0.95)`);
  }

  async init() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "absolute";
    this.canvas.style.pointerEvents = "all";
    this.canvas.style.cursor = "grab";

    this.featuredImageEl.style.position = "relative";
    this.featuredImageEl.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.sizeCanvas();

    try {
      await this.extractImageColors();
      this.createParticles();

      if (this.particles.length > 0) {
        this.originalImage.style.opacity = "0";
        this.setupEventListeners();
        this.animate();
      } else {
        this.canvas.remove();
      }
    } catch {
      this.canvas.remove();
    }

    this.resizeHandler = () => this.handleResize();
    window.addEventListener("resize", this.resizeHandler);

    this.observer = new IntersectionObserver(
      (entries) => {
        const nowVisible = entries[0]?.isIntersecting ?? true;
        if (nowVisible === this.visible) return;
        this.visible = nowVisible;
        if (nowVisible && this.particlesEnabled && this.animationId === null) {
          this.animate();
        } else if (!nowVisible && this.animationId !== null) {
          cancelAnimationFrame(this.animationId);
          this.animationId = null;
        }
      },
      { threshold: 0 }
    );
    this.observer.observe(this.featuredImageEl);
  }

  private sizeCanvas() {
    if (!this.canvas) return;
    const rect = this.featuredImageEl.getBoundingClientRect();

    const expandedWidth = rect.width * 1.35;
    const expandedHeight = rect.height * 1.35;

    this.canvas.width = expandedWidth;
    this.canvas.height = expandedHeight;
    this.canvas.style.width = expandedWidth + "px";
    this.canvas.style.height = expandedHeight + "px";

    this.canvas.style.top = (expandedHeight - rect.height) / -2 + "px";
    this.canvas.style.left = (expandedWidth - rect.width) / -2 + "px";
    this.canvas.style.zIndex = "2";
  }

  private handleResize() {
    if (!this.canvas) return;
    this.sizeCanvas();
    this.createParticles();
  }

  private extractImageColors(): Promise<void> {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d")!;

        const size = 120;
        tempCanvas.width = size;
        tempCanvas.height = size;

        tempCtx.save();
        tempCtx.beginPath();
        tempCtx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        tempCtx.clip();
        tempCtx.drawImage(img, 0, 0, size, size);
        tempCtx.restore();

        this.imageData = tempCtx.getImageData(0, 0, size, size);
        resolve();
      };
      img.src = this.imageSrc;
    });
  }

  private createParticles() {
    if (!this.imageData || !this.canvas) return;

    this.particles = [];
    const data = this.imageData.data;
    const imageSize = 120;

    const imageRect = this.originalImage.getBoundingClientRect();
    const canvasRect = this.canvas.getBoundingClientRect();

    const centerX = imageRect.left - canvasRect.left + imageRect.width / 2;
    const centerY = imageRect.top - canvasRect.top + imageRect.height / 2;
    const imageRadius = Math.min(imageRect.width, imageRect.height) / 2;

    const SAMPLING_STEP = this.particleSamplingStep;
    const PARTICLE_RETENTION = 1.0;

    for (let y = 0; y < imageSize; y += SAMPLING_STEP) {
      for (let x = 0; x < imageSize; x += SAMPLING_STEP) {
        const index = (y * imageSize + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];

        if (a < 50) continue;

        const relativeX = (x - imageSize / 2) / (imageSize / 2);
        const relativeY = (y - imageSize / 2) / (imageSize / 2);
        const distance = Math.sqrt(relativeX * relativeX + relativeY * relativeY);

        if (distance > 0.95) continue;
        if (Math.random() > PARTICLE_RETENTION) continue;

        const worldX = centerX + relativeX * imageRadius;
        const worldY = centerY + relativeY * imageRadius;

        const brightness = (r + g + b) / 3;
        const baseRadius = this.particleBaseRadius + (brightness / 255) * 2.2;
        const radius = baseRadius * 0.85;
        const color = this.particleColor(r, g, b);

        this.particles.push(new PhotoParticle(worldX, worldY, radius, color, worldX, worldY));
      }
    }
  }

  private setupEventListeners() {
    if (!this.canvas) return;
    const canvas = this.canvas;

    canvas.addEventListener("mousedown", (e) => {
      const rect = canvas.getBoundingClientRect();
      this.touchX = e.clientX - rect.left;
      this.touchY = e.clientY - rect.top;
      this.isDragging = true;
      canvas.style.cursor = "grabbing";
    });

    canvas.addEventListener("mouseup", () => {
      this.isDragging = false;
      canvas.style.cursor = "grab";
    });

    canvas.addEventListener("mousemove", (e) => {
      if (this.isDragging) {
        const rect = canvas.getBoundingClientRect();
        this.touchX = e.clientX - rect.left;
        this.touchY = e.clientY - rect.top;
      }
    });

    canvas.addEventListener("mouseleave", () => {
      this.isDragging = false;
      canvas.style.cursor = "grab";
    });

    canvas.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        this.touchX = e.touches[0].clientX - rect.left;
        this.touchY = e.touches[0].clientY - rect.top;
        this.isDragging = true;
      },
      { passive: false }
    );

    canvas.addEventListener("touchend", () => {
      this.isDragging = false;
    });

    canvas.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        if (this.isDragging) {
          const rect = canvas.getBoundingClientRect();
          this.touchX = e.touches[0].clientX - rect.left;
          this.touchY = e.touches[0].clientY - rect.top;
        }
      },
      { passive: false }
    );
  }

  toggleParticles(enabled: boolean) {
    this.particlesEnabled = enabled;
    if (!this.canvas) return;

    if (enabled) {
      this.canvas.style.display = "block";
      this.originalImage.style.opacity = "0";
      if (!this.animationId && this.visible) {
        this.animate();
      }
    } else {
      this.canvas.style.display = "none";
      this.originalImage.style.opacity = "1";
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
    }
  }

  private animate() {
    if (!this.ctx || !this.canvas) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.applyTouchForce();

    const w = this.canvas.width;
    const h = this.canvas.height;
    for (const particle of this.particles) {
      particle.update(w, h);
      particle.draw(this.ctx);
    }

    if (this.visible && this.particlesEnabled) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.animationId = null;
    }
  }

  private applyTouchForce() {
    if (this.isDragging) {
      this.touchForce = Math.min(this.touchMaxForce, this.touchForce + this.touchForceIncrease);
    } else {
      this.touchForce *= this.touchForceDecay;
    }

    if (this.touchForce > 0.1) {
      this.particles.forEach((particle) => {
        const dx = particle.x - this.touchX;
        const dy = particle.y - this.touchY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.touchInfluenceRadius && distance > 0) {
          const normalizedDistance = distance / this.touchInfluenceRadius;
          const forceMagnitude = Math.pow(1 - normalizedDistance, 2.5) * this.touchForce;
          const angle = Math.atan2(dy, dx);

          particle.vx += Math.cos(angle) * forceMagnitude * 1.2;
          particle.vy += Math.sin(angle) * forceMagnitude * 1.2;
        }
      });
    }
  }

  destroy() {
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
    }
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.canvas) {
      this.canvas.remove();
    }
    if (this.originalImage) {
      this.originalImage.style.opacity = "1";
    }
  }
}
