
const BMICategory: Record<string, string> = {
  SevereThinness: 'Underweight (severe thinness)',
  ModerateThinness: 'Underweight (moderate thinness)',
  MildThinness: 'Underweight (mild thinness)',
  Normal: 'Normal range',
  PreObese: 'Overweight (pre-obese)',
  ObeseClassI: 'Obese (class I)',
  ObeseClassII: 'Obese (class II)',
  ObeseClassIII: 'Obese (class III)',
}



const calculateBmi = (heightCm: number, weightKg: number): string => {
  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg) || heightCm <= 0 || weightKg <= 0) {
    throw new Error('Height and weight must be positive, finite numbers');
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  if (bmi < 16.0) return BMICategory.SevereThinness;
  if (bmi < 17.0) return BMICategory.ModerateThinness;
  if (bmi < 18.5) return BMICategory.MildThinness;
  if (bmi < 25.0) return BMICategory.Normal;
  if (bmi < 30.0) return BMICategory.PreObese;
  if (bmi < 35.0) return BMICategory.ObeseClassI;
  if (bmi < 40.0) return BMICategory.ObeseClassII;
  return BMICategory.ObeseClassIII;
};

console.log(calculateBmi(180, 74));
