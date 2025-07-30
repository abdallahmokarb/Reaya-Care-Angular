import { Injectable } from '@angular/core';
import { ISpecialization } from '../../models/ispecialization';

@Injectable({
  providedIn: 'root'
})
export class SpecializationEnrichmentService {
  
  private specializationIcons: { [key: string]: string } = {
    'طب القلب': 'fa-heart-pulse',
    'طب الأعصاب': 'fa-brain',
    'طب الأطفال': 'fa-baby',
    'طب العيون': 'fa-eye',
    'طب الجلدية': 'fa-hand',
    'جراحة العظام': 'fa-bone',
    'الطب الباطني': 'fa-stethoscope',
    'جراحة عامة': 'fa-scalpel',
    'أنف وأذن وحنجرة': 'fa-ear-deaf',
    'طب النساء والتوليد': 'fa-baby-carriage',
    'طب الأورام': 'fa-dna',
    'طب الجهاز الهضمي': 'fa-stomach',
    'طب الروماتيزم': 'fa-joint',
    'طب المسالك البولية': 'fa-bladder',
    'طب الغدد الصماء': 'fa-gland',
    'طب الرئة': 'fa-lungs',
    'طب النفسي': 'fa-head-side-virus',
    'طب التخدير': 'fa-syringe',
    'طب الأشعة': 'fa-x-ray',
    'طب الطوارئ': 'fa-truck-medical'
  };

  private specializationImages: { [key: string]: string } = {
    'طب القلب': 'assets/images/specializations/cardiology.jpg',
    'طب الأعصاب': 'assets/images/specializations/neurology.jpg',
    'طب الأطفال': 'assets/images/specializations/pediatrics.jpg',
    'طب العيون': 'assets/images/specializations/ophthalmology.jpg',
    'طب الجلدية': 'assets/images/specializations/dermatology.jpg',
    'جراحة العظام': 'assets/images/specializations/orthopedics.jpg',
    'الطب الباطني': 'assets/images/specializations/internal-medicine.jpg',
    'جراحة عامة': 'assets/images/specializations/surgery.jpg',
    'أنف وأذن وحنجرة': 'assets/images/specializations/ent.jpg',
    'طب النساء والتوليد': 'assets/images/specializations/gynecology.jpg',
    'طب الأورام': 'assets/images/specializations/oncology.jpg',
    'طب الجهاز الهضمي': 'assets/images/specializations/gastroenterology.jpg',
    'طب الروماتيزم': 'assets/images/specializations/rheumatology.jpg',
    'طب المسالك البولية': 'assets/images/specializations/urology.jpg',
    'طب الغدد الصماء': 'assets/images/specializations/endocrinology.jpg',
    'طب الرئة': 'assets/images/specializations/pulmonology.jpg',
    'طب النفسي': 'assets/images/specializations/psychiatry.jpg',
    'طب التخدير': 'assets/images/specializations/anesthesiology.jpg',
    'طب الأشعة': 'assets/images/specializations/radiology.jpg',
    'طب الطوارئ': 'assets/images/specializations/emergency.jpg'
  };

  enrichSpecializations(specializations: ISpecialization[]): ISpecialization[] {
    return specializations.map(spec => ({
      ...spec,
      icon: this.specializationIcons[spec.name] || 'fa-stethoscope',
      imageUrl: this.specializationImages[spec.name] || 'assets/images/specializations/default.jpg'
    }));
  }
}
