import { Component, OnInit } from '@angular/core';
import { AdminCreateDTO, AdminDTO, AdminUpdateDTO, Gender } from '../../models/Admin/AdminDTOs';
import { AdminService } from '../../shared/services/admin-service';
import { AuthService } from '../../shared/services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-management',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './admin-management.html',
  styleUrl: './admin-management.css'
})
export class AdminManagement implements OnInit {
  admins: AdminDTO[] = [];
  loading = false;
  showModal = false;
  isEditing = false;
  editingAdminId: number | null = null;
  formData: Omit<AdminCreateDTO, 'systemId'> = this.resetFormData();
  formErrors: { [key: string]: string } = {};
  genders = [Gender.Male, Gender.Female];
  genderLabels: { [key in Gender]: string } = {
    [Gender.Male]: 'ذكر',
    [Gender.Female]: 'أنثى'
  };
  errorMessage: string | null = null;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (!user || !user.roles.includes('Admin')) {
      alert('غير مصرح لك بالوصول إلى هذه الصفحة');
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.loading = true;
    this.errorMessage = null;
    this.adminService.getAllAdmins().subscribe({
      next: (admins) => {
        this.admins = admins;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }

  openModal(admin?: AdminDTO): void {
    this.isEditing = !!admin;
    this.editingAdminId = admin?.adminId || null;
    this.formData = admin
      ? {
          userName: '',
          fullName: admin.fullName,
          email: admin.email,
          password: '',
          phoneNumber: admin.phoneNumber,
          dateOfBirth: admin.dateOfBirth,
          gender: admin.gender
        }
      : this.resetFormData();
    this.formErrors = {};
    this.errorMessage = null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.formData = this.resetFormData();
    this.formErrors = {};
    this.errorMessage = null;
  }

  saveAdmin(): void {
    if (!this.validateForm()) return;

    this.loading = true;
    this.errorMessage = null;

    const request = this.isEditing && this.editingAdminId
      ? this.adminService.updateAdmin(this.editingAdminId, this.formData)
      : this.adminService.createAdmin(this.formData);

    request.subscribe({
      next: () => {
        this.loadAdmins();
        this.closeModal();
        alert(this.isEditing ? 'تم تحديث المسؤول بنجاح' : 'تم إنشاء المسؤول بنجاح');
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }

  deleteAdmin(id: number): void {
    if (!confirm('هل أنت متأكد من حذف هذا المسؤول؟')) return;

    this.loading = true;
    this.errorMessage = null;
    this.adminService.deleteAdmin(id).subscribe({
      next: () => {
        this.loadAdmins();
        alert('تم حذف المسؤول بنجاح');
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }

  private resetFormData(): Omit<AdminCreateDTO, 'systemId'> {
    return {
      userName: '',
      fullName: '',
      email: '',
      password: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: Gender.Male
    };
  }

  private validateForm(): boolean {
    this.formErrors = {};

    const { userName, fullName, email, phoneNumber, dateOfBirth, password } = this.formData;

    if (!fullName) this.formErrors['fullName'] = 'الاسم الكامل مطلوب';
    if (!email) this.formErrors['email'] = 'البريد الإلكتروني مطلوب';
    if (!phoneNumber) this.formErrors['phoneNumber'] = 'رقم الهاتف مطلوب';
    if (!dateOfBirth) this.formErrors['dateOfBirth'] = 'تاريخ الميلاد مطلوب';

    if (!this.isEditing) {
      if (!userName) this.formErrors['userName'] = 'اسم المستخدم مطلوب';
      if (!password) this.formErrors['password'] = 'كلمة المرور مطلوبة';
      if (password && password.length < 8) this.formErrors['password'] = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      this.formErrors['email'] = 'يرجى إدخال بريد إلكتروني صحيح';
    }

    const phoneRegex = /^\+?\d{10,15}$/;
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      this.formErrors['phoneNumber'] = 'يرجى إدخال رقم هاتف صحيح';
    }

    const dob = new Date(dateOfBirth);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dateOfBirth && dob >= today) {
      this.formErrors['dateOfBirth'] = 'تاريخ الميلاد يجب أن يكون في الماضي';
    }

    return Object.keys(this.formErrors).length === 0;
  }
}