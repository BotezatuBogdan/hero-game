import { Observable, of, concat } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HeroServiceService } from './hero-service.service';
import { FightService } from './fight.service';
import { DataTransferService } from './data-transfer.service';
import { HttpClient } from '@angular/common/http';


let fightserv = new DataTransferService;


let currentFightText = '';


export class Hero {
    img: string;
    name: string;
    hp: number;
    type: string | undefined;
    lvl: number;
    damage: number;
    id:number;
    nrOfWins: number;
    nrOfLosses: number;

    constructor(name: string, img: string, public dataTransferService?: DataTransferService, public heroServ?: HeroServiceService) {
        this.id = 0;
        this.img = img;
        this.name = name;
        this.hp = 80;
        this.lvl = 1;
        this.damage = 15;
        this.nrOfWins = 0;
        this.nrOfLosses = 0;
    }


    attacked(damage: number) {
        let chance = Math.random();

        if (chance > 0.7) {
            fightserv.updateFightText(this.name + " dodged the attack");
            currentFightText = this.name + " dodged the attack";
            this.dataTransferService?.setLog(currentFightText);
            damage = 0;
        } else if (chance > 0.5) {
            damage *= 0.7;
            currentFightText = this.name + " blocked part of the attack";
            this.dataTransferService?.setLog(currentFightText);
        }
        this.hp -= damage;

        currentFightText = this.name + " has been attacked. \n Hp reduced by " + damage + ". Hp remaining: " + this.hp + ".";
        this.dataTransferService?.setLog(currentFightText);
    }

    attack(otherHero: Hero) {
        //   text
    }
}

export class Witch extends Hero {
    private HOLY_MAGIC_CHANCE = 0.1;
    private DARK_MAGIC_CHANCE = 0.05;
    private WATER_MAGIC_CHANCE = 0.3;
    private FIRE_MAGIC_CHANCE = 0.6;

    constructor(name: string, hp: number, damage: number, lvl: number, override dataTransferService?: DataTransferService, override heroServ?: HeroServiceService) {
        super(name, "Witch.png");
        this.hp = hp;
        this.damage = damage;
        this.lvl = lvl;
        this.type = "Witch";
    }

    private applyHolyMagic(): void {
        currentFightText = this.name + " used holy magic to restore a huge amount of HP.";
        this.dataTransferService?.setLog(currentFightText);
        this.hp += 200; // Restore full HP
    }

    private applyDarkMagic(damage: number): number {
        currentFightText = this.name + " used dark magic to deal high damage damage!";
        this.dataTransferService?.setLog(currentFightText);
        return damage * 20; // Deal 500 damage
    }

    private applyWaterMagic(damage: number): number {
        currentFightText = this.name + " used water magic to heal itself.";
        this.dataTransferService?.setLog(currentFightText);
        this.hp += damage; // Heal the witch
        return damage;
    }

    private applyFireMagic(damage: number): number {
        currentFightText = this.name + " used fire magic to increase damage.";
        this.dataTransferService?.setLog(currentFightText);
        return damage * 2.5; // Increase damage with fire magic
    }

    private applyElementalEffect(damage: number): number {
        let chance = Math.random();

        if (chance < this.DARK_MAGIC_CHANCE) {
            return this.applyDarkMagic(damage);
        } else if (chance < this.HOLY_MAGIC_CHANCE) {
            this.applyHolyMagic();
            return 0;
        } else if (chance < this.WATER_MAGIC_CHANCE) {
            return this.applyWaterMagic(damage);
        } else if (chance < this.FIRE_MAGIC_CHANCE) {
            return this.applyFireMagic(damage);
        } else {
            return damage;
        }
    }

    override attack(otherHero: Hero) {
        let damage = this.damage;
        damage = this.applyElementalEffect(damage);

        currentFightText = this.name + " attacked " + otherHero.name + " with damage: " + damage + ".";
        this.dataTransferService?.setLog(currentFightText);
        otherHero.attacked(damage);
    }
}


export class Necromancer extends Hero {
    private DEATHS_GRASP_CHANCE = 0.01;
    private SOUL_DRAIN_CHANCE = 0.3;
    private SUMMON_ZOMBIE_CHANCE = 0.6;

    constructor(name: string,hp: number, damage: number, lvl: number, override dataTransferService?: DataTransferService, override heroServ?: HeroServiceService) {
        super(name, "Necromancer.png");
        this.hp = hp;
        this.damage = damage;
        this.lvl = lvl;
        this.type = "Necromancer";
    }

    private applyDeathsGrasp(damage: number): number {
        currentFightText = this.name + " used Death's Grasp to deal lethal damage.";
        this.dataTransferService?.setLog(currentFightText);
        return damage * 500;
    }

    private applySoulDrain(damage: number): number {
        currentFightText = this.name + " used Soul Drain to drain life energy and restore its HP.";
        this.dataTransferService?.setLog(currentFightText);
        this.hp += (damage * 2);
        return damage * 2;
    }

    private applySummonZombie(damage: number): number {
        currentFightText = this.name + " summoned a zombie to attack!";
        this.dataTransferService?.setLog(currentFightText);
        return damage + 15;
    }

    private applyNormalAttack(damage: number): number {
        currentFightText = this.name + " attacks!";
        this.dataTransferService?.setLog(currentFightText);
        return damage;
    }

    private applyNecromancy(damage: number): number {
        let chance = Math.random();

        if (chance < this.DEATHS_GRASP_CHANCE) {
            return this.applyDeathsGrasp(damage);
        } else if (chance < this.SOUL_DRAIN_CHANCE) {
            return this.applySoulDrain(damage);
        } else if (chance < this.SUMMON_ZOMBIE_CHANCE) {
            return this.applySummonZombie(damage);
        } else {
            return damage;
        }
    }

    override attack(otherHero: Hero) {
        let damage = this.damage;
        damage = this.applyNecromancy(damage);

        currentFightText = this.name + " attacked " + otherHero.name + " with damage: " + damage + "."
        this.dataTransferService?.setLog(currentFightText);
        otherHero.attacked(damage);
    }
}

export class Knight extends Hero {
    private HEAL_CHANCE = 0.2;
    private CRUSHING_BLOW_CHANCE = 0.3;
    private VALIANT_STRIKE_CHANCE = 0.4;
    private GUARD_CHANCE = 0.25;
    private COUNTER_ATTACK_CHANCE = 0.5;

    constructor(name: string,hp: number, damage: number, lvl: number, override dataTransferService?: DataTransferService, override heroServ?: HeroServiceService) {
        super(name, "Knight.png");
        this.hp = hp;
        this.damage = damage;
        this.lvl = lvl;
        this.type = "Knight";
    }

    private applyHeal(): void {

        currentFightText = this.name + " used a healing potion for 20hp";
        this.dataTransferService?.setLog(currentFightText);
        this.hp += 20;
    }

    private applyCrushingBlow(damage: number): number {

        currentFightText = this.name + " used Crushing Blow to deal extra damage.";
        this.dataTransferService?.setLog(currentFightText);
        return damage * 1.5; // Increase damage with Crushing Blow
    }


    private applyValiantStrike(damage: number): number {

        currentFightText = this.name + " used Valiant Strike for a powerful attack!";
        this.dataTransferService?.setLog(currentFightText);
        return damage * 2; // Increase damage for Valiant Strike
    }

    private applyGuard(damage: number): number {

        currentFightText = this.name + " used Guard to protect and restore some HP";
        this.dataTransferService?.setLog(currentFightText);
        this.hp += 30;
        return damage * 0.3;
    }

    private applyCounterAttack(damage: number): number {

        currentFightText = this.name + " used Counter Attack to retaliate!";
        this.dataTransferService?.setLog(currentFightText);
        return damage * 1.2; // Increase damage during counter attack
    }

    private applyCombatAbility(damage: number): number {
        let chance = Math.random();

        if (chance < this.HEAL_CHANCE) {
            this.applyHeal();
            return 0;
        } else if (chance < this.GUARD_CHANCE) {
            return this.applyGuard(damage);
        } else if (chance < this.CRUSHING_BLOW_CHANCE) {
            return this.applyCrushingBlow(damage);
        } else if (chance < this.VALIANT_STRIKE_CHANCE) {
            return this.applyValiantStrike(damage);
        } else if (chance < this.COUNTER_ATTACK_CHANCE) {
            return this.applyCounterAttack(damage);
        } else {
            return damage;
        }
    }

    override attack(otherHero: Hero) {
        let damage = this.damage;
        damage = this.applyCombatAbility(damage);

        currentFightText = this.name + " attacked " + otherHero.name + " with damage: " + damage + ".";
        this.dataTransferService?.setLog(currentFightText);
        otherHero.attacked(damage);
    }
}

export class Dragon extends Hero {
    private FIRE_BREATH_CHANCE = 0.2;
    private TAIL_SWEEP_CHANCE = 0.3;
    private CLAW_ATTACK_CHANCE = 0.5;

    constructor(name: string,hp: number, damage: number, lvl: number, override dataTransferService?: DataTransferService, override heroServ?: HeroServiceService) {
        super(name, "Dragon.png");
        this.hp = hp;
        this.damage = damage;
        this.lvl = lvl;
        this.type = "Dragon";
    }

    private applyFireBreath(damage: number): number {

        currentFightText = this.name + " used Fire Breath to scorch its enemies.";
        this.dataTransferService?.setLog(this.name + " used Fire Breath to scorch its enemies.");
        return damage * 1.8;
    }

    private applyTailSweep(damage: number): number {

        currentFightText = this.name + " used Tail Sweep to knock enemies down.";
        this.dataTransferService?.setLog(this.name + " used Tail Sweep to knock enemies down.");
        return damage * 1.2;
    }

    private applyClawAttack(damage: number): number {

        currentFightText = this.name + " used Claw Attack for a ferocious strike!";
        this.dataTransferService?.setLog(this.name + " used Claw Attack for a ferocious strike!");
        return damage * 1.5;
    }

    private applyCombatAbility(damage: number): number {
        let chance = Math.random();

        if (chance < this.FIRE_BREATH_CHANCE) {
            return this.applyFireBreath(damage);
        } else if (chance < this.TAIL_SWEEP_CHANCE) {
            return this.applyTailSweep(damage);
        } else if (chance < this.CLAW_ATTACK_CHANCE) {
            return this.applyClawAttack(damage);
        } else {
            return damage;
        }
    }

    override attack(otherHero: Hero) {
        let damage = this.damage;
        damage = this.applyCombatAbility(damage);

        currentFightText = this.name + " attacked " + otherHero.name + " with damage: " + damage + "."
        this.dataTransferService?.setLog(currentFightText);
        otherHero.attacked(damage);
    }
}

export class Fight {
    hero1: Hero;
    hero2: Hero;
    turn: number;

    currentText = '';

    constructor(hero1: Hero, hero2: Hero, private dataTransferService?: DataTransferService, public heroServ?: HeroServiceService) {
        this.hero1 = hero1;
        this.hero2 = hero2;
        this.turn = 0;

    }

    performAttack() {
        if (this.turn === 0) {
            this.hero1.attack(this.hero2);
        } else {
            this.hero2.attack(this.hero1);
        }
    }

    changeTurn() {

        this.turn = 1 - this.turn;
    }

    findWinner() {
        if (this.hero1.hp > 0) {
            this.dataTransferService?.setLog(this.hero1.name + " won with: " + this.hero1.hp + " HP left.");
            if(this.heroServ) {
                this.heroServ.levelUpHero(this.hero1, this.hero2);
            }

        } else if (this.hero2.hp > 0) {
            this.dataTransferService?.setLog(this.hero2.name + " won with: " + this.hero2.hp + " HP left.");
            if(this.heroServ) {
                this.heroServ.levelUpHero(this.hero2, this.hero1);
            }
            

        } else {
            this.dataTransferService?.setLog("No hero left alive.");

        }
    }

    go() {

        this.dataTransferService?.resetLog();

        const fightLoop = () => {
            if (this.hero1.hp > 0 && this.hero2.hp > 0) {

                this.performAttack();
                this.changeTurn();

                currentFightText = '\n___________\n\n';
                this.dataTransferService?.setLog(currentFightText);

                setTimeout(fightLoop, 500);
            } else {
                this.findWinner();
            }
        };

        fightLoop();


    }

}

